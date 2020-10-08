import {
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/core';
import React, { useState } from 'react';
import { addPart } from '../api/addPart';
import { listParts } from '../api/listParts';
import { Part } from '../types';

interface ActionsProps {
  repo: number;
  setResult: Function;
  clear: Function;
}

const Actions: React.FC<ActionsProps> = ({ repo, setResult, clear }) => {
  const [showActions, setShowActions] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [partForm, setPartForm] = useState({
    name: '',
    description: '',
    subcomponents: [['', 1]]
  });
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        mt={4}
        variantColor='blue'
        onClick={() => setShowActions((p) => !p)}
      >
        Ações
      </Button>
      <Collapse mt={2} isOpen={showActions}>
        <Flex direction='column'>
          <Button
            onClick={() => {
              clear();
              listParts(repo, setResult, setLoading1, setShowActions);
            }}
            variantColor='teal'
            alignSelf='flex-start'
            isLoading={loading1}
          >
            Obter lista de partes do repositório
          </Button>
          <Button
            onClick={onOpen}
            mt={2}
            variantColor='green'
            alignSelf='flex-start'
          >
            Adicionar nova parte
          </Button>
        </Flex>
      </Collapse>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar nova parte</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor='name'>Nome</FormLabel>
              <Input
                type='text'
                id='name'
                value={partForm.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = e.target.value;
                  setPartForm((p) => ({ ...p, name: newValue }));
                }}
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel htmlFor='description'>Descrição</FormLabel>
              <Input
                type='text'
                id='description'
                value={partForm.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = e.target.value;
                  setPartForm((p) => ({ ...p, description: newValue }));
                }}
              />
            </FormControl>
            {partForm.subcomponents.map((comp, i) => (
              <FormControl mt={2} key={comp[0]}>
                <FormLabel htmlFor={'subpart' + i}>Subparte {i + 1}</FormLabel>
                <Flex>
                  <Input
                    type='text'
                    width='60%'
                    id={'subpart' + i}
                    placeholder='ID da subparte...'
                    value={partForm.subcomponents[i][0]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newSubcomponents = partForm.subcomponents;
                      newSubcomponents[i][0] = e.target.value;
                      setPartForm((p) => ({
                        ...p,
                        subcomponents: newSubcomponents
                      }));
                    }}
                  />
                  <Input
                    type='number'
                    ml={2}
                    width='40%'
                    placeholder='Quantidade...'
                    id={'subpart' + i}
                    value={partForm.subcomponents[i][1]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newSubcomponents = partForm.subcomponents;
                      newSubcomponents[i][1] = e.target.value;
                      setPartForm((p) => ({
                        ...p,
                        subcomponents: newSubcomponents
                      }));
                    }}
                  />
                </Flex>
              </FormControl>
            ))}
            <Flex mt={2} justifyContent='flex-end'>
              <Icon
                cursor='pointer'
                name='add'
                color='green.500'
                size='32px'
                onClick={() => {
                  const newSubcomponents = partForm.subcomponents;
                  newSubcomponents.push(['', 1]);
                  setPartForm((p) => ({
                    ...p,
                    subcomponents: newSubcomponents
                  }));
                }}
              />
              <Icon
                cursor={
                  partForm.subcomponents.length > 0 ? 'pointer' : 'not-allowed'
                }
                ml={2}
                name='minus'
                color={
                  partForm.subcomponents.length > 0 ? 'red.500' : 'gray.500'
                }
                size='32px'
                onClick={() => {
                  const newSubcomponents = partForm.subcomponents;
                  newSubcomponents.pop();
                  setPartForm((p) => ({
                    ...p,
                    subcomponents: newSubcomponents
                  }));
                }}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              variantColor='green'
              mr={3}
              isLoading={loading2}
              onClick={async () => {
                clear();
                const response = await addPart(
                  repo,
                  setResult,
                  setLoading2,
                  setShowActions,
                  partForm as Part
                );
                const toastOps = {
                  description: response.msg,
                  duration: 5000,
                  isClosable: true
                };
                if (response.err) {
                  toast({ ...toastOps, title: 'Erro :(', status: 'error' });
                } else {
                  toast({ ...toastOps, title: 'Sucesso!', status: 'success' });
                }
              }}
            >
              Adicionar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Actions;
