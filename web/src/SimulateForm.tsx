import { Form, FormField, FormLabel } from '@radix-ui/react-form';
import { Button, Card, Flex, Heading, Separator, TextField } from '@radix-ui/themes';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Routes } from 'routes';

type FormValue = number | '';
interface FormData {
  Planet: {
    x: FormValue;
    y: FormValue;
    vx: FormValue;
    vy: FormValue;
  };
  Satellite: {
    x: FormValue;
    y: FormValue;
    vx: FormValue;
    vy: FormValue;
  };
}

const SimulateForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    Planet: { x: 0, y: 0.1, vx: 0.1, vy: 0 },
    Satellite: { x: 0, y: 1, vx: 1, vy: 0 },
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: FormValue = value === '' ? '' : parseFloat(value);
    setFormData((prev) => _.set({ ...prev }, name, newValue));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8000/simulation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate(Routes.SIMULATION);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [formData]
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: '5%',
        left: 'calc(50% - 200px)',
        overflow: 'scroll',
      }}
    >
      {/* Card: https://www.radix-ui.com/themes/docs/components/card */}
      <Card
        style={{
          width: '400px',
        }}
      >
        <Heading as='h2' size='4' weight='bold' mb='4'>
          Run a Simulation
        </Heading>
        <Link to={Routes.SIMULATION}>View previous simulation</Link>
        <Separator size='4' my='5' />
        <Form onSubmit={handleSubmit}>
          {/* 
            *********************************
            Planet
            *********************************
            */}
          <Heading as='h3' size='3' weight='bold'>
            Planet
          </Heading>
          {/* Form: https://www.radix-ui.com/primitives/docs/components/form */}
          <FormField name='Planet.x'>
            <FormLabel htmlFor='Planet.x'>Initial X-position</FormLabel>
            <TextField.Root
              type='number'
              id='Planet.x'
              name='Planet.x'
              value={formData.Planet.x}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField name='Planet.y'>
            <FormLabel htmlFor='Planet.y'>Initial Y-position</FormLabel>
            <TextField.Root
              type='number'
              id='Planet.y'
              name='Planet.y'
              value={formData.Planet.y}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField name='Planet.vx'>
            <FormLabel htmlFor='Planet.vx'>Initial X-velocity</FormLabel>
            <TextField.Root
              type='number'
              id='Planet.vx'
              name='Planet.vx'
              value={formData.Planet.vx}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField name='Planet.vy'>
            <FormLabel htmlFor='Planet.vy'>Initial Y-velocity</FormLabel>
            <TextField.Root
              type='number'
              id='Planet.vy'
              name='Planet.vy'
              value={formData.Planet.vy}
              onChange={handleChange}
              required
            />
          </FormField>
          {/* 
            *********************************
            Satellite
            *********************************
             */}
          <Heading as='h3' size='3' weight='bold' mt='4'>
            Satellite
          </Heading>
          <FormField name='Satellite.x'>
            <FormLabel htmlFor='Satellite.x'>Initial X-position</FormLabel>
            <TextField.Root
              type='number'
              id='Satellite.x'
              name='Satellite.x'
              value={formData.Satellite.x}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField name='Satellite.y'>
            <FormLabel htmlFor='Satellite.y'>Initial Y-position</FormLabel>
            <TextField.Root
              type='number'
              id='Satellite.y'
              name='Satellite.y'
              value={formData.Satellite.y}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField name='Satellite.vx'>
            <FormLabel htmlFor='Satellite.vx'>Initial X-velocity</FormLabel>
            <TextField.Root
              type='number'
              id='Satellite.vx'
              name='Satellite.vx'
              value={formData.Satellite.vx}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField name='Satellite.vy'>
            <FormLabel htmlFor='Satellite.vy'>Initial Y-velocity</FormLabel>
            <TextField.Root
              type='number'
              id='Satellite.vy'
              name='Satellite.vy'
              value={formData.Satellite.vy}
              onChange={handleChange}
              required
            />
          </FormField>
          <Flex justify='center' m='5'>
            <Button type='submit'>Submit</Button>
          </Flex>
        </Form>
      </Card>
    </div>
  );
};

export default SimulateForm;
