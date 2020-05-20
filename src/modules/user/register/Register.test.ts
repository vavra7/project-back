import { testConnection } from "../../../test-utils/testConnection";
import { Connection } from "typeorm";
import { graphqlCall } from "../../../test-utils/graphqlCall";

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

const registerMutation = `
  mutation ($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;

describe("Register", () => {
  it("create user", async () => {
    console.log(
      await graphqlCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: "Tomáš",
            lastName: "Vavřinka",
            email: "tomas.vavrinka@seznam.cz",
            password: "password",
          },
        },
      })
    );
  });
});
