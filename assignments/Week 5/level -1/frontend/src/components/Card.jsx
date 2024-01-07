import React from 'react'

function Card({form: {name, desc, socials, interests}}) {
  console.log(name, desc, socials, interests)
  return (
    <div>Card</div>
  )
}

export default Card