"use client"
import { useState, useEffect } from 'react'

export default function Home(){
  const [tab, setTab] = useState('home')
  const [global, setGlobal] = useState(0)
  const [balance, setBalance] = useState(0)
  const [received, setReceived] = useState(0)

  useEffect(()=>{
    // Karbo live data daga Telegram
    const tg = (window as any).Telegram?.WebApp
    if(tg) tg.ready()
    
    // Loda data idan an adana
    const s = localStorage.getItem('stats')
    if(s){
      const d = JSON.parse(s)
      setGlobal(d.global || 0)
      setBalance(d.balance || 0)
      setReceived(d.received || 0)
    }
  },[])

  const addReward = (amount: number) => {
    setBalance(b => {
      const nb = b + amount
      setReceived(r => r+1)
      setGlobal(g => g+1)
      localStorage.setItem('stats', JSON.stringify({global: global+1, balance: nb, received: received+1}))
      return nb
    })
  }

  return (
    <div className="min-h-screen bg-[#0f1220] text-white p-4">
      {/* Stats - Yanzu ba static number - live ne */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-purple-600/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">{global}</div>
          <div className="text-xs">Global</div>
        </div>
        <div className="bg-yellow-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">{balance}</div>
          <div className="text-xs">Balance</div>
        </div>
        <div className="bg-blue-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">{received}</div>
          <div className="text-xs">Received</div>
        </div>
      </div>

      {/* Content */}
      {tab === 'home' && (
        <div>
          <h2 className="font-bold mb-3">MY TASKS</h2>
          <button onClick={()=>addReward(20)} className="w-full bg-[#1e223a] p-4 rounded-xl mb-2 text-left">MAIN - Click to Earn 20</button>
          <button onClick={()=>addReward(10)} className="w-full bg-[#1e223a] p-4 rounded-xl mb-2 text-left">AD1 - Click to Earn 10</button>
          <button onClick={()=>addReward(10)} className="w-full bg-[#1e223a] p-4 rounded-xl text-left">AD2 - Click to Earn 10</button>
        </div>
      )}
      {tab === 'tasks' && <div>Tasks Page - Complete tasks to earn!</div>}
      {tab === 'top' && <div>Top Referrals - Global: {global} users</div>}
      {tab === 'ref' && <div>Invite friends - Your balance: {balance}</div>}

      {/* Bottom Nav - Yanzu yana aiki */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1e223a] flex justify-around p-3">
        <button onClick={()=>setTab('home')} className={tab==='home'?'text-purple-400':''}>Home</button>
        <button onClick={()=>setTab('tasks')} className={tab==='tasks'?'text-purple-400':''}>Tasks</button>
        <button onClick={()=>setTab('top')} className={tab==='top'?'text-purple-400':''}>Top</button>
        <button onClick={()=>setTab('ref')} className={tab==='ref'?'text-purple-400':''}>Ref</button>
      </div>
    </div>
  )
}
