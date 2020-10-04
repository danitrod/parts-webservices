import {
  Button,
  ButtonProps,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text
} from '@chakra-ui/core';
import React, { useState } from 'react';
import Actions from 'src/components/Actions';
import Part from 'src/components/Part';
import { clearSubparts } from '../api/clearSubparts';
import { getPart } from '../api/getPart';
import { removePart } from '../api/removePart';
import { Part as PartType } from '../types';

const MenuButtonAsButton = MenuButton as React.FC<
  MenuButtonProps & ButtonProps
>;

const index: React.FC = () => {
  const [currentRepository, setCurrentRepository] = useState(1);
  const [result, setResult] = useState({ parts: {} });
  const [part, setPart] = useState({});

  const handleRepositoryChange = (newRepo: number) => {
    setResult({ parts: {} });
    setPart({});
    setCurrentRepository(newRepo);
  };

  const getSpecificPart = async (id: string) => {
    const response = await getPart(currentRepository, id);
    setResult({ parts: {} });
    setPart({ ...response.part, warning: response.warning });
  };

  let specificPart = null;
  if (Object.keys(part).length > 0) {
    const typedPart = part as PartType & { id: string; warning?: string[] };
    specificPart = (
      <>
        <Heading color='red.400' fontSize='lg' mt={4}>
          Parte específica
        </Heading>
        <Part
          name={typedPart.name}
          description={typedPart.description}
          id={typedPart.id}
          subcomponents={typedPart.subcomponents}
          getPart={getSpecificPart}
          warning={typedPart.warning}
          specific
        />
        <Flex mt={2}>
          <Button
            variantColor='red'
            onClick={async () => {
              await removePart(currentRepository, typedPart.id);
              setPart({});
            }}
          >
            Apagar peça
          </Button>
          <Button
            ml={2}
            variantColor='red'
            isDisabled={typedPart.subcomponents === undefined}
            onClick={async () => {
              await clearSubparts(currentRepository, typedPart.id);
              setPart({});
            }}
          >
            Remover subpartes
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Flex
      bg='gray.700'
      pt={4}
      pb={2}
      minH='100vh'
      direction='column'
      alignItems='center'
    >
      <Heading color='red.400'>Bem vind@ ao ReposiParts</Heading>
      <Text color='white' mt={2}>
        Repositório atual: {currentRepository}
      </Text>
      <Menu>
        <MenuButtonAsButton as={Button} rightIcon='chevron-down'>
          Trocar repositório
        </MenuButtonAsButton>
        <MenuList>
          <MenuItem onClick={() => handleRepositoryChange(1)}>
            Repositório 1
          </MenuItem>
          <MenuItem onClick={() => handleRepositoryChange(2)}>
            Repositório 2
          </MenuItem>
        </MenuList>
      </Menu>
      <Actions
        repo={currentRepository}
        setResult={setResult}
        clear={() => {
          setPart({});
          setResult({ parts: {} });
        }}
      />
      {Object.keys(result.parts).length > 0 && (
        <>
          <Heading color='red.400' fontSize='lg' mt={4}>
            Resultados
          </Heading>
          <SimpleGrid
            columns={Object.keys(result.parts).length > 5 ? 4 : 2}
            mt={2}
            spacing={8}
          >
            {Object.keys(result.parts).map((key) => {
              return (
                <Part
                  name={result.parts[key].name}
                  description={result.parts[key].description}
                  id={key}
                  subcomponents={result.parts[key].subcomponents}
                  getPart={getSpecificPart}
                />
              );
            })}
          </SimpleGrid>
        </>
      )}
      {specificPart}
    </Flex>
  );
};

export default index;
