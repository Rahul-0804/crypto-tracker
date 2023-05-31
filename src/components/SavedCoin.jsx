import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import  { AiOutlineClose } from 'react-icons/ai'
import {doc, onSnapshot, updateDoc} from   'firebase/firestore'
import {db} from '../Firebase'
import {UserAuth} from '../context/AuthContext'

const SavedCoin = () => {
    const [coins, setCoins] = useState([])

    const {user} = UserAuth()

    useEffect(()=>{
        onSnapshot(doc(db,'users',`${user?.email}`), (doc)=>{
            setCoins(doc.data()?.watchList)
        })
    },[user?.email])


    const coinPath = doc(db,'users',`${user?.email}`)
    const deleteCoin = async (pid) =>{
        try{
            const result = coins.filter((item)=>item.id!==pid)
            await updateDoc(coinPath,{watchList:result})
        }
        catch(err){
            console.log(err.message)
        }
    }

  return (
    <div>
        {coins?.length === 0 ?(<p className='text-2xl'>You don't have any coins saved. Please save a coin to add it to watch list. <Link to='/' className='text-accent'>Click here to search coins.</Link> </p>):(
            <table className='w-full border-collapse text-center'>
                <thead>
                    <tr className='border-b'>
                        <th className='px-4'>Rank</th>
                        <th className='text-left'>Coin</th>
                        <th className='text-left'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {coins?.map((coin)=>(
                        <tr className='h-[60px] overflow-hidden' key= {coin.id}>
                            <td>{coin?.rank}</td>
                            <td>
                                <Link to = {`/coins/${coin.id}`}>
                                    <div className='flex items-center '>
                                        <img className='w-8 mr-4' src={coin?.image} alt={coin?.name} />
                                        <div>
                                            <p className='hidden sm:table-cell'>{coin?.name}</p>
                                            <p className='text-gray-500 text-left text-sm'>{coin?.symbol.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className='pl-8'><AiOutlineClose className='cursor-pointer' onClick={()=>deleteCoin(coin.id)}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default SavedCoin