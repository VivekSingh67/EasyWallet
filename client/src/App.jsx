import React, { useState } from 'react';
import './App.css';
import walletService from './service/wallet';

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  })

  const submitWithdraw = async()=>{
    const res = await walletService.withdrawMoney(formData);
    if(res){
      closeModal();
    }
  }

  const closeModal = () => setActiveModal(null);

  const renderModal = () => {
    if (!activeModal) return null;

    let title = "";
    let content = null;

    if (activeModal === 'addFunds') {
      title = "Add Funds";
      content = (
        <div className="modal-form">
          <input type="text" placeholder="Title (e.g., Salary, Transfer)" className="modal-input" />
          <input type="number" placeholder="Enter amount to add (₹)" className="modal-input" />
          <button className="btn-primary full-width" onClick={closeModal}>Confirm</button>
        </div>
      );
    } else if (activeModal === 'withdraw') {
      title = "Withdraw";
      content = (
        <div className="modal-form">
          <input type="text" value={formData.title} onChange={(e)=>setFormData({...formData,title:e.target.value})} placeholder="Title (e.g., Rent, Groceries)" className="modal-input" />
          <input type="number" value={formData.amount} onChange={(e)=>setFormData({...formData,amount:e.target.value})} placeholder="Enter amount to withdraw (₹)" className="modal-input" />
          <input type="text" value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})} placeholder="Category (e.g., Food, Bills)" className="modal-input" />
          <input type="date" value={formData.date} onChange={(e)=>setFormData({...formData,date:e.target.value})} className="modal-input" />
          <button className="btn-primary full-width" onClick={submitWithdraw}>Confirm</button>
        </div>
      );
    } else if (activeModal === 'edit') {
      title = "Edit Transaction";
      content = (
        <div className="modal-form">
          <input type="text" placeholder="Transaction Title" className="modal-input" />
          <input type="number" placeholder="Amount (₹)" className="modal-input" />
          <button className="btn-primary full-width" onClick={closeModal}>Save Changes</button>
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
            <h2 className="balance">₹24,562.00</h2>
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
                <tr>
                  <td>
                    <div className="tx-title">Direct Deposit - Salary</div>
                    <div className="tx-date">Oct 15, 2026</div>
                  </td>
                  <td className="tx-amount positive">+₹4,200.00</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="tx-title">Apple Store</div>
                    <div className="tx-date">Oct 14, 2026</div>
                  </td>
                  <td className="tx-amount">-₹1,299.00</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="tx-title">Netflix Subscription</div>
                    <div className="tx-date">Oct 12, 2026</div>
                  </td>
                  <td className="tx-amount">-₹15.99</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="tx-title">Transfer from Savings</div>
                    <div className="tx-date">Oct 10, 2026</div>
                  </td>
                  <td className="tx-amount positive">+₹850.00</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="tx-title">Amazon Prime</div>
                    <div className="tx-date">Oct 09, 2026</div>
                  </td>
                  <td className="tx-amount">-₹120.00</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="tx-title">Uber Ride</div>
                    <div className="tx-date">Oct 08, 2026</div>
                  </td>
                  <td className="tx-amount">-₹45.50</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="tx-title">Starbucks</div>
                    <div className="tx-date">Oct 07, 2026</div>
                  </td>
                  <td className="tx-amount">-₹8.75</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="tx-title">Freelance Payment</div>
                    <div className="tx-date">Oct 05, 2026</div>
                  </td>
                  <td className="tx-amount positive">+₹1,500.00</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="tx-title">Gym Membership</div>
                    <div className="tx-date">Oct 01, 2026</div>
                  </td>
                  <td className="tx-amount">-₹60.00</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="tx-title">Grocery Store</div>
                    <div className="tx-date">Sep 28, 2026</div>
                  </td>
                  <td className="tx-amount">-₹210.30</td>
                  <td className="tx-actions">
                    <button className="icon-btn edit" title="Edit" onClick={() => setActiveModal('edit')}>✏️</button>
                    <button className="icon-btn delete" title="Delete">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
