jest.mock('superjson', () => ({
  serialize: (data: any) => ({ json: JSON.stringify(data) }),
  deserialize: (obj: any) => JSON.parse(obj.json),
  default: {
    serialize: (data: any) => ({ json: JSON.stringify(data) }),
    deserialize: (obj: any) => JSON.parse(obj.json),
  },
}))
