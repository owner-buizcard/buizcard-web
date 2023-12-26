import { Skeleton } from '@mui/material'
import React from 'react'

const SkeletonTable = ()=>{
  return (
    <div>
        <Skeleton height={85}/>
        <Skeleton height={85}/>
        <Skeleton height={85}/>
        <Skeleton height={85}/>
        <Skeleton height={85}/>
    </div>
  )
}

export default SkeletonTable