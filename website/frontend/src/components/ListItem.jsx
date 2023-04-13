import React, { useState, useEffect } from "react"
import { Box, Card, Text, Spacer } from "@chakra-ui/react"
import axios from 'axios'

//this is a component for each todo item once it has been added
const ListItem = props => {

  const {
    name,
    value,
  } = props

  const [stringValue, setStringValue] = useState(``)

  const handleValues = () => {
    if (value === false)
      setStringValue(`false`)
    else
      setStringValue(value)
  }

  useEffect(() => {
    handleValues()
  }, [])

  //since this is a component, it returns the jsx for each todo item individually rather than showing HTML for a full page
  return (
    <Box d="flex" alignItems="center" justifyContent="space-between" w="50%">
      <Card d="flex" flexDirection="row" alignItems="center" p="0.5rem" pl="1rem" pr="1rem" mb="0.5rem" bg="blue.600">
        <Text color='white'>{name}</Text>
        <Spacer />
        <Text color='white'>{stringValue}</Text>
      </Card>
    </Box>
  )
}

export default ListItem
