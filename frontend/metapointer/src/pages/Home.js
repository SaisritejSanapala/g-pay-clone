import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {

    const num = localStorage.getItem("user")

    const [user, setUser] = useState(null)

    const [transferAmount, setTransferAmount] = useState('');

    const [recipientPhoneNum, setRecipientPhoneNum] = useState('');


    const [money, setMoney] = useState("")


    const [transactions, setTransactions] = useState(null)

    const getUserDetails = () => {
        axios.get(`http://localhost:4000/user/${num}`)
            .then((result) => {
                setUser(result.data.user)
            })
            .catch((error) => {
                console.log(error)
            })
    }



    const handleTransfer = () => {
        axios.post(`http://localhost:4000/transfer`, { from: user.phoneNum, to: recipientPhoneNum, amount: transferAmount })
            .then((result) => {
                getUserDetails()
            })
            .catch((error) => {
                console.log(error)
            })
    }


    const addMoney = () => {
        const phoneNum = user.phoneNum
        axios.put(`http://localhost:4000/addmoney`, { phoneNum, money })
            .then((result) => {
                console.log(result)
                setMoney("")
                getUserDetails()
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const getTransactions = () => {
        const phoneNum = user.phoneNum
        axios.get(`http://localhost:4000/transactions/${phoneNum}`)
            .then((result) => {
                console.log(result)
                setTransactions(result.data.transactions)
                getUserDetails()
            })
            .catch((error) => {
                console.log(error)
            })

    }




    useEffect(() => {
        getUserDetails()

    }, [])


    return (
        !(user === null) ?
            <div>

                <h1>Welcome {user.phoneNum}</h1>

                <p>Available Balance: {user.availableAmount}</p>
                <div>
                    <h4>Add money to wallet</h4>
                    <input type='number' value={money} onChange={(e) => setMoney(e.target.value)} />
                    <button onClick={addMoney}>Add</button>
                </div>

                <form onSubmit={handleTransfer} style={{ marginTop: 50 + "px" }}>
                    <label htmlFor='recepientNumber'>Recepient Number: </label>
                    <input type='number' id='recepientNumber' value={recipientPhoneNum} onChange={(e) => setRecipientPhoneNum(e.target.value)} /> <br />

                    <label htmlFor='amount'>Amount: </label>
                    <input type='number' id='amount' value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} /> <br />
                    <button type='submit'>Transfer</button>
                </form>


                <div style={{ marginTop: 50 + "px" }} >
                    <button onClick={getTransactions}>Transactions</button>

                    {transactions !== null ?
                        <ul>
                            {transactions.map((transaction) => {
                              return(
                                <li>
                                    <h1>From: {transaction.from}</h1>
                                    <h2>To: {transaction.to}</h2>
                                    <p>Transferred Amount: {transaction.amount}</p>
                                    <p>Cashback: {transaction.cashback} </p>
                                </li>
                              )

                            })}
                        </ul>

                        :
                        ""}

                </div>


            </div>


            :

            <p>...loading</p>
    );
};

export default Home;
