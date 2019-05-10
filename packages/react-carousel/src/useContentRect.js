import { useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export default function useContentRect (ref) {
 const [contentRect, setContentRect] = useState(
   ref.current ? ref.current.getBoundingClientRect() : {}
 )

 useEffect(() => {
   if (!ref.current) return

   const observer = new ResizeObserver(entries => {
     setContentRect(entries[0].contentRect)
   })

   observer.observe(ref.current)

   return () => {
     observer.disconnect(ref.current)
   }
 }, [ref])

 return contentRect
}
