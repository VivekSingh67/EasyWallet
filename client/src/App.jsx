import React, { useState, useEffect } from 'react';
import './App.css';
import walletService from './service/wallet';
import fundService from './service/fund';

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [editData, setEditData] = useState(null);
  const [category, setCategory] = useState([]);

  const [fundData, setFundData] = useState({
    title: "",
    amount: "",
    date: ""
  });

  const [walletData, setWalletData] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });
  const [withdrawnMoneyData, setWithdrawnMoneyData] = useState([]);
  const [addfunds, setAddFunds] = useState([]);

  useEffect(() => {
    fetchWithdrawnMoneyData();
    fetchAddFundsData();
    fetchCategories();
  }, [])

  const handleFundSubmit = async () => {
    const res = await fundService.addFund(fundData)
    if (res.success) {
      fetchAddFundsData();
      closeModal()
    }
  }

  const fetchCategories = async () => {
    const res = await walletService.getCategories();
    setCategory(res);
  };

  const fetchWithdrawnMoneyData = async () => {
    const res = await walletService.getWithdrawnMoneyData();
    setWithdrawnMoneyData(res.data || []);
  }

  const fetchAddFundsData = async () => {
    const res = await fundService.getFunds();
    setAddFunds(res.funds || []);
  }

  const submitWithdraw = async () => {
    await walletService.withdrawMoney(walletData);
    fetchWithdrawnMoneyData();
    closeModal();
  }

  const handleEditClick = (item) => {
    let formattedDate = '';
    if (item.date) {
      formattedDate = new Date(item.date).toISOString().split('T')[0];
    }
    setEditData({ ...item, date: formattedDate });
    setActiveModal('edit');
  };

  const submitEdit = async () => {
    if (editData.type === 'addFund') {
      const res = await fundService.editFund(editData._id, editData);
      if (res.success) {
        fetchAddFundsData();
        closeModal();
      }
    } else if (editData.type === 'withdraw') {
      const res = await walletService.editWithdrawMoney(editData._id, editData);
      if (res.success) {
        fetchWithdrawnMoneyData();
        closeModal();
      }
    }
  };

  const handleDeleteClick = async (item) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      if (item.type === 'addFund') {
        await fundService.deleteFund(item._id);
        fetchAddFundsData();
      } else if (item.type === 'withdraw') {
        await walletService.deleteWithdrawnMoneyData(item._id);
        fetchWithdrawnMoneyData();
      }
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditData(null);
  };

  const renderModal = () => {
    if (!activeModal) return null;

    let title = "";
    let content = null;

    if (activeModal === 'addFunds') {
      title = "Add Funds";
      content = (
        <div className="modal-form">
          <input type="text" placeholder="Title (e.g., Salary, Transfer)" onChange={(e) => setFundData({ ...fundData, title: e.target.value })} className="modal-input" />
          <input type="number" placeholder="Enter amount to add (₹)" onChange={(e) => setFundData({ ...fundData, amount: e.target.value })} className="modal-input" />
          <input type="date" className="modal-input" onChange={(e) => setFundData({ ...fundData, date: e.target.value })} />
          <button className="btn-primary full-width" onClick={handleFundSubmit}>Confirm</button>
        </div>
      );
    } else if (activeModal === 'withdraw') {
      title = "Withdraw";
      content = (
        <div className="modal-form">
          <input type="text" onChange={(e) => setWalletData({ ...walletData, title: e.target.value })} placeholder="Title (e.g., Rent, Groceries)" className="modal-input" />
          <input type="number" onChange={(e) => setWalletData({ ...walletData, amount: e.target.value })} placeholder="Enter amount to withdraw (₹)" className="modal-input" />
          <select onChange={(e) => setWalletData({ ...walletData, category: e.target.value })} className="modal-input">
            <option value="">Select Category</option>
            {
              category.map((cat) => {
                return (
                  <option key={cat} value={cat}>{cat}</option>
                )
              })
            }
          </select>
          <input type="date" onChange={(e) => setWalletData({ ...walletData, date: e.target.value })} className="modal-input" />
          <button className="btn-primary full-width" onClick={submitWithdraw}>Confirm</button>
        </div>
      );
    } else if (activeModal === 'edit') {
      title = editData?.type === 'addFund' ? "Edit Add Funds" : "Edit Withdraw";
      content = (
        <div className="modal-form">
          <input type="text" value={editData?.title || ''} onChange={(e) => setEditData({ ...editData, title: e.target.value })} placeholder="Transaction Title" className="modal-input" />
          <input type="number" value={editData?.amount || ''} onChange={(e) => setEditData({ ...editData, amount: e.target.value })} placeholder="Amount (₹)" className="modal-input" />
          {editData?.type === 'withdraw' && (
            <select value={editData?.category || ''} onChange={(e) => setEditData({ ...editData, category: e.target.value })} className="modal-input">
              <option value="">Select Category</option>
              {category.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
          <input type="date" value={editData?.date || ''} onChange={(e) => setEditData({ ...editData, date: e.target.value })} className="modal-input" />
          <button className="btn-primary full-width" onClick={submitEdit}>Save Changes</button>
        </div>
      );
    }

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="close-btn" onClick={closeModal}>&times;</button>
          </div>
          <div className="modal-body">
            {content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="wallet-app">
      {renderModal()}

      <main className="main-content">
        <section className="balance-card">
          <div className="balance-info">
            <p className="subtitle">Available Balance</p>
            <h2 className="balance">
              ₹{((addfunds || []).reduce((acc, curr) => acc + Number(curr.amount), 0) - (withdrawnMoneyData || []).reduce((acc, curr) => acc + Number(curr.amount), 0)).toFixed(2)}
            </h2>
            <p className="account-number">Account: **** 4589</p>
          </div>
          <div className="balance-actions">
            <button className="btn-primary" onClick={() => setActiveModal('addFunds')}>Add Funds</button>
            <button className="btn-secondary" onClick={() => setActiveModal('withdraw')}>Withdraw</button>
          </div>
        </section>

        <section className="transactions-section">
          <div className="transactions-container">
            <table className="transactions-table">
              <tbody>
                {
                  [...(withdrawnMoneyData || []).map(item => ({...item, type: 'withdraw'})), ...(addfunds || []).map(item => ({...item, type: 'addFund'}))]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>
                          <div className="tx-title">{item.title}</div>
                          <div className="tx-date">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</div>
                        </td>
                        <td className={`tx-amount ${item.type === 'addFund' ? 'positive' : ''}`}>
                          {item.type === 'addFund' ? '+' : '-'}₹{item.amount}
                        </td>
                        <td className="tx-actions">
                          <button className="icon-btn edit" title="Edit" onClick={() => handleEditClick(item)}>✏️</button>
                          <button className="icon-btn delete" title="Delete" onClick={() => handleDeleteClick(item)}>🗑️</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
