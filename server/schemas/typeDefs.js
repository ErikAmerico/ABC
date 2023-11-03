const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    roles: [String]
    cdlProgram: Boolean
    cdl: Boolean
    email: String
    phone: String
    list: Int
    password: String
  }

  input UserInput {
    firstName: String
    lastName: String
    roles: [String]
    cdlProgram: Boolean
    cdl: Boolean
    email: String
    phone: String
    list: Int
    password: String
  }

  type Contact {
    id: ID
    firstName: String
    lastName: String
    title: String
    roles: [String]
    email: String
    phone: String
    company: Company
  }

  input ContactInput {
    firstName: String
    lastName: String
    title: String
    roles: [String]
    email: String
    phone: String
    company: ID
  }

  type Company {
    id: ID
    names: [String]
    addresses: [Address]
    contacts: [Contact]
    roles: [String]
  }

  input CompanyInput {
    names: [String]
    addresses: [AddressInput]
    contacts: [ContactInput]
    roles: [String]
  }

  type Address {
    street: String
    city: String
    state: String
    zipCode: String
    floors: [Floor]
  }

  input AddressInput {
    street: String
    city: String
    state: String
    zipCode: String
    floors: [FloorInput]
  }

  type Floor {
    floorNumber: [String]
    rooms: [String]
  }

  input FloorInput {
    floorNumber: [String]
    rooms: [String]
  }

  type Job {
    id: ID!
    date: String
    startTime: String
    estimate: String
    origin: [String]
    destination: [String]
    account: [Company]
    serviceType: String
    remarks: String
    contact: [Contact]
    noCrewCab: Boolean
    tailgate: Boolean
    truck100: Boolean
    openBack: Boolean
    stairs: Boolean
    tooltime: Boolean
    crewSize: Int
    trucks: [Truck]
    vans: [Van]
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

  input JobInput {
    date: String
    startTime: String
    estimate: String
    origin: [String]
    destination: [String]
    account: [ID]
    serviceType: String
    remarks: String
    contact: [ID]
    noCrewCab: Boolean
    tailgate: Boolean
    truck100: Boolean
    openBack: Boolean
    stairs: Boolean
    tooltime: Boolean
    crewSize: Int
    trucks: [ID]
    vans: [ID]
    supervisors: [ID]
    drivers: [ID]
    helpers: [ID]
    techs: [ID]
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

  type Truck {
    id: ID
    number: Int
    crewCab: Boolean
    cdl: Boolean
    cdlProgram: Boolean
    goodTailgate: Boolean
    roles: [String]
  }

  input TruckInput {
    number: Int
    crewCab: Boolean
    cdl: Boolean
    cdlProgram: Boolean
    goodTailgate: Boolean
    roles: [String]
  }

  type Van {
    id: ID
    number: Int
    openBack: Boolean
    roles: [String]
  }

  input VanInput {
    number: Int
    openBack: Boolean
    roles: [String]
  }

  type Query {
    me: User
    users: [User]
    getUser(id: ID!): User
    getJob(id: ID!): Job
    getCompany(id: ID!): Company
    getCompanies: [Company]
    getContact(id: ID!): Contact
    getContacts: [Contact]
    getTruck(id: ID!): Truck
    getTrucks: [Truck]
    getVan(id: ID!): Van
    getVans: [Van]
    getJobsByDate(date: String!): [Job]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User
    createJob(input: JobInput!): Job!
    updateJob(id: ID!, input: JobInput!): Job
    deleteJob(id: ID!): Job
    createCompany(input: CompanyInput!): Company!
    updateCompany(id: ID!, input: CompanyInput!): Company
    deleteCompany(id: ID!): Company
    createContact(input: ContactInput!): Contact!
    updateContact(id: ID!, input: ContactInput!): Contact
    deleteContact(id: ID!): Contact
    createTruck(input: TruckInput!): Truck!
    updateTruck(id: ID!, input: TruckInput!): Truck
    deleteTruck(id: ID!): Truck
    createVan(input: VanInput!): Van!
    updateVan(id: ID!, input: VanInput!): Van
    deleteVan(id: ID!): Van
  }
`;

module.exports = typeDefs;
