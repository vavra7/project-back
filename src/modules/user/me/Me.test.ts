import { testConnection } from '../../../test-utils/testConnection';
import { Connection } from 'typeorm';
import { graphqlCall } from '../../../test-utils/graphqlCall';
import faker from 'faker';
import { User } from '../../../entity/User';

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

const meQuery = `
  {
    me {
      id
      firstName
      lastName
      email
      name
    }
  }
`;

describe('Me', () => {
  it('get user', async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    }).save();

    const response = await graphqlCall({
      source: meQuery,
      userId: user.id
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`
        }
      }
    });
  });

  it('return null', async () => {
    const response = await graphqlCall({
      source: meQuery
    });

    expect(response).toMatchObject({
      data: {
        me: null
      }
    });
  });
});
