import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Landing from './Landing'
import React from 'react'

describe('Landing component', () => {
  it('renders title and form fields', () => {
    render(<Landing />)
    expect(screen.getByRole('heading', { name: /SaaS/i })).toBeDefined()
    expect(screen.getByPlaceholderText(/Your name/i)).toBeDefined()
    expect(screen.getByPlaceholderText(/you@company.com/i)).toBeDefined()
  })
})
