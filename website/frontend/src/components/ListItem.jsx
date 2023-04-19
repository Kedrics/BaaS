import React, { useState, useEffect } from "react"
import { Box, Card, Text, Spacer, Input } from "@chakra-ui/react"
import axios from 'axios'

//this is a component for each todo item once it has been added
const ListItem = props => {

  const {
    name,
    value,
    isUpdate,
    handleChangeUpdateInput
  } = props

  const [stringValue, setStringValue] = useState(``)
  const [isInput, setIsInput] = useState(false)


  const handleValues = () => {
    if (value === false)
      setStringValue(`false`)
    else
      setStringValue(value)
  }

  useEffect(() => {
    handleValues()
    if (isUpdate) {
      handleIsInput()
    }
    else {
      setIsInput(false)
    }
  }, [isUpdate])

  const handleIsInput = () => {
    setIsInput(!isInput)
  }

  //since this is a component, it returns the jsx for each todo item individually rather than showing HTML for a full page
  return (
    <Box d="flex" alignItems="center" justifyContent="space-between" w="50%">
      <Card d="flex" flexDirection="row" alignItems="center" p="0.5rem" pl="1rem" pr="1rem" mb="0.5rem" bg="blue.600">
        <Text color='white'>{name}</Text>
        <Spacer />
        {!isInput ?
          <Text color='white'>{stringValue}</Text>
          :
          <Input name={name} placeholder={stringValue} type="text" color='white' onChange={handleChangeUpdateInput} disabled={name === `order_id` || name === `time_stamp` ? true : false} />
        }
      </Card>
    </Box>
  )
}

export default ListItem
