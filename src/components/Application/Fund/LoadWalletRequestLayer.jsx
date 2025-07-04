import React, { useEffect, useState } from 'react'
import './css/BankCard.css';
import LoadWalletRequestModal from './Modal/LoadWalletRequestModal';

function LoadWalletRequestLayer() {
    const [bankList, setBankList] = useState([]);

    const fetchBankAcc = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const formData = new FormData();
            formData.append("type", "banks");

            const response = await fetch(`${import.meta.env.VITE_APP_API_KEY}/fund/transaction`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                if (result.statuscode === "TXN") {
                    setBankList(result.data);
                } else {
                    console.error("Unexpected status code:", result.statuscode);
                }
            } else {
                console.error("Failed to fetch bank accounts:", response.status);
            }
        } catch (error) {
            console.error("Error fetching bank accounts:", error);
        }
    };

    useEffect(() => {
        fetchBankAcc();
    }, []);
  return (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                {bankList.length > 0 ? (
                    bankList.map(bank => (
                        <div key={bank.id} >
                            <BankCard
                                bank={bank.name}
                                number={bank.account}
                                ifsc={bank.ifsc}
                                branch={bank.branch}
                                img="https://i.ibb.co/5WQwWypd/cG5n.png" 
                                id={bank.id}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>No bank accounts found.</p>
                    </div>
                )}
            </div>
  )
}

export default LoadWalletRequestLayer

const BankCard = ({ bank, number, ifsc, branch, img ,id}) => {
    return (
        <div className="bank-card bg-base">
            <div className="bank-header">
                <div className="bank-icon">
                    <img src={img} alt="Bank Icon" />
                </div>
                <div className="bank-name text-black">{bank}</div>
            </div>
            <div className="bank-details">
                <div className="detail-row text-primary">
                    <span className="detail-label text-black fw-bold">Account Number:</span>
                    <span className="detail-value text-black fw-semibold">{number}</span>
                </div>
            
                <div className="detail-row">
                    <span className="detail-label text-black fw-bold">IFSC Code:</span>
                    <span className="detail-value text-black fw-semibold">{ifsc}</span>
                </div>
            

                <div className="detail-row">
                    <span className="detail-label text-black fw-bold">Branch:</span>
                    <span className="detail-value text-black fw-semibold">{branch}</span>
                </div>
            

            </div>
            <LoadWalletRequestModal id={id}/>
        </div>
    );
};