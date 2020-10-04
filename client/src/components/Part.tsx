import { Flex, Icon, PseudoBox, Text } from '@chakra-ui/core';
import React from 'react';
import { Part as PartProps } from '../types';

const Part: React.FC<
  PartProps & {
    id: string;
    getPart: Function;
    specific?: any;
    warning?: string[];
  }
> = (props) => {
  return (
    <PseudoBox
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      bg='gray.100'
      p={4}
      borderRadius={2}
      shadow='md'
      cursor={props.specific ? 'default' : 'pointer'}
      _hover={props.specific ? {} : { bg: 'green.200' }}
      onClick={() => !props.specific && props.getPart(props.id)}
    >
      <Text fontSize='lg' color='red.400' textAlign='center'>
        {props.name}
      </Text>
      <Text color='gray.500' fontWeight='bold'>
        ID: {props.id}
      </Text>
      {props.specific && (
        <Text fontSize='sm' color='gray.800' textAlign='center'>
          {props.description}
        </Text>
      )}
      {props.specific &&
        props.subcomponents?.map((sub) => {
          const warningIcon = props.warning?.includes(sub[0]) ? (
            <Icon name='warning' color='red.500' size='16px' />
          ) : null;
          return (
            <Flex>
              <Text color={warningIcon === null ? 'green.600' : 'orange.700'}>
                Subpeça {sub[0]} - {sub[1]} unidades {warningIcon}
              </Text>
            </Flex>
          );
        })}
    </PseudoBox>
  );
};

export default Part;
