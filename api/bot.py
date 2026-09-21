"use client"
import { useState, useEffect } from 'react'

export default function Home(){
  const [tab, setTab] = useState('home')
  const [globalCount, setGlobalCount] = useState(0) // na canza suna daga global
  const [balance, setBalance] = useState(0)
  const [received, setReceived] = useState(0)

  // 1. Loda data
  useEffect(()=>{
    const tg = (window as any).Telegram?.WebApp
    if(tg) tg.ready()
    
    const s = localStorage.getItem('stats')
    if(s){
      try {
        const d = JSON.parse(s)
        setGlobalCount(d.globalCount || 0)
        setBalance(d.balance || 0)
        setReceived(d.received || 0)
      } catch {}
    }
  },[])

  // 2. Save data duk lokacin da ya canza - wannan shine mafi kyau
  useEffect(()=>{
    localStorage.setItem('stats', JSON.stringify({globalCount, balance, received}))
  }, [globalCount, balance, received])

  const addReward = (amount: number) => {
    setBalance(b => b + amount)
    setReceived(r => r + 1)
    setGlobalCount(g => g + 1)
  }

  return (
    <div className="min-h-screen bg-[#0f1220] text-white p-4 pb-20">
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-purple-600/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">{globalCount}</div>
          <div className="text-xs opacity-70">Global</div>
        </div>
        <div className="bg-yellow-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">{balance}</div>
          <div className="text-xs opacity-70">Balance</div>
        </div>
        <div className="bg-blue-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold">{received}</div>
          <div className="text-xs opacity-70">Received</div>
        </div>
      </div>

      {tab === 'home' && (
        <div>
          <h2 className="font-bold mb-3">MY TASKS</h2>
          <button onClick={()=>addReward(20)} className="w-full bg-[#1e223a] p-4 rounded-xl mb-2 text-left active:scale-95 transition">MAIN - Click to Earn 20</button>
          <button onClick={()=>addReward(10)} className="w-full bg-[#1e223a] p-4 rounded-xl mb-2 text-left active:scale-95 transition">AD1 - Click to Earn 10</button>
          <button onClick={()=>addReward(10)} className="w-full bg-[#1e223a] p-4 rounded-xl text-left active:scale-95 transition">AD2 - Click to Earn 10</button>
        </div>
      )}
      {tab === 'tasks' && <div className="bg-[#1e223a] p-4 rounded-xl">Tasks Page - Complete tasks to earn!</div>}
      {tab === 'top' && <div className="bg-[#1e223a] p-4 rounded-xl">Top Referrals - Global: {globalCount} users</div>}
      {tab === 'ref' && <div className="bg-[#1e223a] p-4 rounded-xl">Invite friends - Your balance: {balance}</div>}

      <div className="fixed bottom-0 left-0 right-0 bg-[#1e223a] flex justify-around p-3 border-t border-white/10">
        <button onClick={()=>setTab('home')} className={tab==='home'?'text-purple-400 font-bold':''}>Home</button>
        <button onClick={()=>setTab('tasks')} className={tab==='tasks'?'text-purple-400 font-bold':''}>Tasks</button>
        <button onClick={()=>setTab('top')} className={tab==='top'?'text-purple-400 font-bold':''}>Top</button>
        <button onClick={()=>setTab('ref')} className={tab==='ref'?'text-purple-400 font-bold':''}>Ref</button>
      </div>
    </div>
  )
}
