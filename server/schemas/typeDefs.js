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
    callContactUponArrival: Boolean
    callContactWhenLeavingAbc: Boolean
    callContactWhenClose: Boolean
    noCrewCabs: Boolean
    tailgate: Boolean
    truck100: Boolean
    openBack: Boolean
    stairs: Boolean
    toolTime: Boolean
    materialSheet: Boolean
    bostonCrateSheet: Boolean
    parkingPermits: Boolean
    directions: Boolean
    crewSize: Int
    trucks: [Truck]
    vans: [Van]
    supervisors: [User]
    drivers: [User]
    helpers: [User]
    techs: [User]
    equipment: Equipment
    description: String
    minInsurance: Boolean
    selfInsurance: Boolean
    frcInsurance: Boolean
    cost: String
    emailInvoice: String
    billTo: String
    holdForCrates: Boolean
    salesMan: String
    author: String
    poNum: String
    projectNum: String
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
    callContactUponArrival: Boolean
    callContactWhenLeavingAbc: Boolean
    callContactWhenClose: Boolean
    noCrewCabs: Boolean
    tailgate: Boolean
    truck100: Boolean
    openBack: Boolean
    stairs: Boolean
    toolTime: Boolean
    materialSheet: Boolean
    bostonCrateSheet: Boolean
    parkingPermits: Boolean
    directions: Boolean
    crewSize: Int
    trucks: [ID]
    vans: [ID]
    supervisors: [ID]
    drivers: [ID]
    helpers: [ID]
    techs: [ID]
    equipment: EquipmentInput
    description: String
    minInsurance: Boolean
    selfInsurance: Boolean
    frcInsurance: Boolean
    cost: String
    emailInvoice: String
    billTo: String
    holdForCrates: Boolean
    salesMan: String
    author: String
    poNum: String
    projectNum: String
    references: String
    groupBill: String
    prePayment: String
  }

  input updateJobInput {
    id: ID!
    date: String
    startTime: String
    estimate: String
    origin: [String]
    destination: [String]
    account: [ID]
    serviceType: String
    remarks: String
    contact: [ID]
    noCrewCabs: Boolean
    tailgate: Boolean
    truck100: Boolean
    openBack: Boolean
    stairs: Boolean
    toolTime: Boolean
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
    billTo: String
    holdForCrates: Boolean
    salesMan: String
    author: String
    poNum: Int
    projectNum: Int
    references: String
    groupBill: String
    prePayment: String
  }

  type Equipment {
    dolly: Int
    comp: Int
    panel: Int
    library: Int
    bin: Int
    techBin: Int
    trashBin: Int
    tool: String
    makitaCount: Int
    makita: [Int]
    ramp14: Int
    ramp10: Int
    ramp8: Int
    ramp6: Int
    platform: Int
    steelPlate: Int
    hoodLift: Int
    safeJackCount: Int
    safeJack: [String]
    palletJack: Int
    skinnyJack: Int
    jBar: Int
    bigRed: Int
    masonite4: Int
    masonite8: Int
    ductTape: Int
    blueTape: Int
    coroflex: String
    carpetGuard: Boolean
    broom: Boolean
    allenSet: Boolean
    bitBox: Boolean
    socketSet: Boolean
    foamAcknowledge: Boolean
    foam1L: String
    foam1S: String
    foam2L: String
    foam2S: String
    white: String
    carpetRiser: Int
    rubberRiser: Int
    other: String
  }

  input EquipmentInput {
    dolly: Int
    comp: Int
    panel: Int
    library: Int
    bin: Int
    techBin: Int
    trashBin: Int
    tool: String
    makitaCount: Int
    makita: [Int]
    ramp14: Int
    ramp10: Int
    ramp8: Int
    ramp6: Int
    platform: Int
    steelPlate: Int
    hoodLift: Int
    safeJackCount: Int
    safeJack: [String]
    palletJack: Int
    skinnyJack: Int
    jBar: Int
    bigRed: Int
    masonite4: Int
    masonite8: Int
    ductTape: Int
    blueTape: Int
    coroflex: String
    carpetGuard: Boolean
    broom: Boolean
    allenSet: Boolean
    bitBox: Boolean
    socketSet: Boolean
    foamAcknowledge: Boolean
    foam1L: String
    foam1S: String
    foam2L: String
    foam2S: String
    white: String
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
