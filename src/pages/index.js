import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

let socket;

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [queue, setQueue] = useState([])
  const [request, setRequest] = useState([])
  useEffect(() => {
    socketInitializer()
    observeQueueAndSwapRequest()
  }, []);
  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io("localhost:3001")

    socket.on('connect', () => {
      console.log('Socket connected')
    })

    socket.on('update-queue', queue => {
      setQueue(queue)
    })

    socket.on('update-swap', swap => {
      setRequest(swap)
    })
  }

  const observeQueueAndSwapRequest = async () => {
    await axios.post("/api/database/observeQueue", { size: 3 })
    await axios.post("/api/database/observeSwapRequest", { targetId: "64bbeab700ce2c1d0047cb1c" })
  }

  return (
    <div>
      <p>Queue size: {queue.length}</p>
      <p>Swap request size: {request.length}</p>
    </div>
  )
}
