import { useKey } from '@/components/context/keyProvider'
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { toast } from 'react-toastify'

const AddKeyFormHandler = () => {
  const [label, setLabel] = useState("")
  const [issuer, setIssuer] = useState("")
  const [secret, setSecret] = useState("")

  const {addKey, isHaveKey} = useKey()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (isHaveKey(secret)) {
      toast("You already have this key!", {type: "error"})
    } else {
      addKey(secret, label, issuer, new Date().toISOString());
    }
    e.preventDefault()
  };
  return {
    handleSubmit,
    label,
    setLabel,
    issuer,
    setIssuer,
    secret,
    setSecret
  }
}

export default AddKeyFormHandler