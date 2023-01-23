import React from 'react'
import { KeyDataInterface } from '../../constant/interfaces'
import KeyCardHandler from './index.handler'

const KeyCard = (props: KeyDataInterface) => {
  const handler = KeyCardHandler()
  return (
    <div className="dark:bg-base-300 w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col p-4">
          <div className="flex flex-row">
            <h3>{props.issuer} </h3>
            <h4>({props.label})</h4>
          </div>
          <h2>123123</h2>
        </div>
        <div className='flex flex-col'>
          
        </div>
      </div>
    </div>
  );
}

export default KeyCard