import type { User } from './types'
const API = 'https://jsonplaceholder.typicode.com/users'
export async function fetchUsers(): Promise<User[]> { const response = await fetch(API); if (!response.ok) throw new Error(`The mock API returned ${response.status}`); const data: unknown = await response.json(); if (!Array.isArray(data)) throw new Error('The mock API returned an unexpected response'); return data as User[] }
