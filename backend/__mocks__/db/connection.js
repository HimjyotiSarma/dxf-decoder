// prevent any real DB init in tests
export const connectDB = jest.fn().mockResolvedValue()
