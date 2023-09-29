const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    roles: [String]
    email: String
    phone: String
  }

  type Contact {
    id: ID
    name: String
    title: String
    email: String
    phone: String
    company: Company
  }

  type Company {
    id: ID
    names: [String]
    addresses: [Address]
    contacts: [Contact]
  }

  type Address {
    street: String
    city: String
    state: String
    zipCode: String
    floors: [Floor]
  }

  type Floor {
    floorNumber: [Int]
    rooms: [String]
  }

  type Move {
    id: ID!
    date: String
    startTime: String
    estimate: String
    origin: Origin
    destination: Destination
    noCrewCab: Boolean
    tailgate: Boolean
    truck100: Boolean
    openBack: Boolean
    stairs: Boolean
    tooltime: Boolean
    crewSize: Int
    trucks: [Int]
    vans: [Int]
    supervisors: [User]
    drivers: [User]
    helpers: [User]
    techs: [User]
    equipment: Equipment
    description: String
    insurance: String
    billTo: Company
    attention: String
    holdForCrates: Boolean
    salesMan: User
    author: User
    poNum: Int
    projectNum: Int
    references: String
    groupBill: String
    prePayment: String
  }

  type Origin {
    company: Company
    contact: Contact
    altContact: Contact
    additional: String
  }

  type Destination {
    company: Company
    contact: Contact
    altContact: Contact
    additional: String
  }

  type Equipment {
    dollies: Int
    comps: Int
    panels: Int
    library: Int
    bins: Int
    teachBins: Int
    trashBins: Int
    tools: [String]
    makita: [Int]
    ramps: [Int]
    platform: Int
    steelPlate: Int
    hoodLift: Int
    safeJacks: [String]
    palletJacks: Int
    sknnyJack: Int
    Jbar: Int
    bigRed: Int
    masonite: String
    ductTape: Int
    blutTape: Int
    coroflex: Int
    carpetGuard: Boolean
    broom: Boolean
    allenSet: Boolean
    bitBox: Boolean
    socketSet: Boolean
    foam: [String]
    white: [String]
    carpetRiser: Int
    rubberRiser: Int
    other: String
  }

  type Query {
    me: User
    getUser(id: ID!): User
    getMove(id: ID!): Move
    getCompany(id: ID!): Company
    getContact(id: ID!): Contact
  }

  type Auth {
    token: ID!
    user: User
  }

  input MoveInput {
    date: String
    startTime: String
    estimate: String
    origin: OriginInput
    destination: DestinationInput
    noCrewCab: Boolean
    tailgate: Boolean
    truck100: Boolean
    openBack: Boolean
    stairs: Boolean
    tooltime: Boolean
    crewSize: Int
    trucks: [Int]
    vans: [Int]
    supervisors: [UserInput]
    drivers: [UserInput]
    helpers: [UserInput]
    techs: [UserInput]
    equipment: EquipmentInput
    description: String
    insurance: String
    billTo: CompanyInput
    attention: String
    holdForCrates: Boolean
    salesMan: UserInput
    author: UserInput
    poNum: Int
    projectNum: Int
    references: String
    groupBill: String
    prePayment: String
  }

  input OriginInput {
    company: CompanyInput
    contact: ContactInput
    altContact: ContactInput
    additional: String
  }

  input DestinationInput {
    company: CompanyInput
    contact: ContactInput
    altContact: ContactInput
    additional: String
  }

  input EquipmentInput {
    dollies: Int
    comps: Int
    panels: Int
    library: Int
    bins: Int
    teachBins: Int
    trashBins: Int
    tools: [String]
    makita: [Int]
    ramps: [Int]
    platform: Int
    steelPlate: Int
    hoodLift: Int
    safeJacks: [String]
    palletJacks: Int
    sknnyJack: Int
    Jbar: Int
    bigRed: Int
    masonite: String
    ductTape: Int
    blutTape: Int
    coroflex: Int
    carpetGuard: Boolean
    broom: Boolean
    allenSet: Boolean
    bitBox: Boolean
    socketSet: Boolean
    foam: [String]
    white: [String]
    carpetRiser: Int
    rubberRiser: Int
    other: String
  }

  input CompanyInput {
    names: [String]
    addresses: [AddressInput]
    contacts: [ContactInput]
  }

  input AddressInput {
    street: String
    city: String
    state: String
    zipCode: String
    floors: [FloorInput]
  }

  input FloorInput {
    floorNumber: [Int]
    rooms: [String]
  }

  input ContactInput {
    name: String
    title: String
    email: String
    phone: String
    company: CompanyInput
  }

  input UserInput {
    firstName: String
    lastName: String
    roles: [String]
    email: String
    phone: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User
    createMove(input: MoveInput!): Move!
    updateMove(id: ID!, input: MoveInput!): Move
    deleteMove(id: ID!): Move
    createCompany(input: CompanyInput!): Company!
    updateCompany(id: ID!, input: CompanyInput!): Company
    deleteCompany(id: ID!): Company
    createContact(input: ContactInput!): Contact!
    updateContact(id: ID!, input: ContactInput!): Contact
    deleteContact(id: ID!): Contact
  }
`;

module.exports = typeDefs;
