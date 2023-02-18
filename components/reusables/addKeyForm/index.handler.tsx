import React, { FormEvent, FormEventHandler, useState } from 'react'

const AddKeyFormHandler = () => {
  const [label, setLabel] = useState("")
  const [issuer, setIssuer] = useState("")
  const [secret, setSecret] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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