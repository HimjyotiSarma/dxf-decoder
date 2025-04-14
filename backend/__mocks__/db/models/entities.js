export default {
  findAll: jest.fn().mockResolvedValue([]),
  count: jest.fn().mockResolvedValue(0),
  findByPk: jest.fn().mockResolvedValue(null),
}
