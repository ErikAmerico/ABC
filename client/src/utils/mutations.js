import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      roles
      cdlProgram
      cdl
      email
      phone
      list
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      firstName
      lastName
      roles
      cdlProgram
      cdl
      email
      phone
      list
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      firstName
      lastName
      roles
      cdlProgram
      cdl
      email
      phone
      list
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation CreateJob($input: JobInput!) {
    createJob(input: $input) {
      id
      date
      startTime
      estimate
      origin
      destination
      account {
        id
      }
      serviceType
      contact {
        id
      }
      noCrewCabs
      tailgate
      truck100
      openBack
      stairs
      toolTime
      crewSize
      trucks {
        id
      }
      vans {
        id
      }
      supervisors {
        id
      }
      drivers {
        id
      }
      helpers {
        id
      }
      techs {
        id
      }
      equipment {
        dolly
        comp
        panel
        library
        bin
        techBin
        trashBin
        tool
        makitaCount
        makita
        ramp14
        ramp10
        ramp8
        ramp6
        platform
        steelPlate
        hoodLift
        safeJackCount
        safeJack
        palletJack
        skinnyJack
        jBar
        bigRed
        masonite4
        masonite8
        ductTape
        blueTape
        coroflex
        carpetGuard
        broom
        allenSet
        bitBox
        socketSet
        foamAcknowledge
        foam1L
        foam1S
        foam2L
        foam2S
        white
        carpetRiser
        rubberRiser
        other
      }
      description
      minInsurance
      selfInsurance
      frcInsurance
      billTo
      holdForCrates
      salesMan
      author
      poNum
      projectNum
      references
      groupBill
      prePayment
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation UpdateJob($id: ID!, $input: JobInput!) {
    updateJob(id: $id, input: $input) {
      id
      date
      startTime
      estimate
      origin
      destination
      account {
        id
      }
      serviceType
      contact {
        id
      }
      crewSize
      trucks {
        id
      }
      vans {
        id
      }
      supervisors {
        id
      }
      drivers {
        id
      }
      helpers {
        id
      }
      techs {
        id
      }
      equipment {
        dolly
        comp
        panel
        library
        bin
        techBin
        trashBin
        tool
        makitaCount
        makita
        ramp14
        ramp10
        ramp8
        ramp6
        platform
        steelPlate
        hoodLift
        safeJackCount
        safeJack
        palletJack
        skinnyJack
        jBar
        bigRed
        masonite4
        masonite8
        ductTape
        blueTape
        coroflex
        carpetGuard
        broom
        allenSet
        bitBox
        socketSet
        foamAcknowledge
        foam1L
        foam1S
        foam2L
        foam2S
        white
        carpetRiser
        rubberRiser
        other
      }
      callContactUponArrival
      callContactWhenLeavingAbc
      callContactWhenClose
      noCrewCabs
      tailgate
      truck100
      openBack
      stairs
      toolTime
      materialSheet
      bostonCrateSheet
      parkingPermits
      directions
      description
      cost
      emailInvoice
      billTo
      holdForCrates
      salesMan
      author
      poNum
      projectNum
      references
      groupBill
      prePayment
      minInsurance
      selfInsurance
      frcInsurance
    }
  }
`;

export const DELETE_JOB = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id) {
      id
    }
  }
`;

export const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
      id
      names
      addresses {
        street
        city
        state
        zipCode
        floors {
          floorNumber
          rooms
        }
      }
      contacts {
        id
        firstName
        lastName
        title
        roles
        email
        phone
      }
      roles
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($id: ID!, $input: CompanyInput!) {
    updateCompany(id: $id, input: $input) {
      id
      names
      addresses {
        street
        city
        state
        zipCode
        floors {
          floorNumber
          rooms
        }
      }
      contacts {
        id
        firstName
        lastName
        title
        roles
        email
        phone
      }
      roles
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      id
      names
      addresses {
        street
        city
        state
        zipCode
        floors {
          floorNumber
          rooms
        }
      }
      contacts {
        id
        firstName
        lastName
        title
        roles
        email
        phone
      }
      roles
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) {
      id
      firstName
      lastName
      title
      roles
      email
      phone
      company {
        id
      }
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: ID!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) {
      id
      firstName
      lastName
      title
      roles
      email
      phone
      company {
        id
        names
        addresses {
          street
          city
          state
          zipCode
          floors {
            floorNumber
            rooms
          }
        }
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id) {
      id
      firstName
      lastName
      title
      roles
      email
      phone
      company {
        id
        names
        addresses {
          street
          city
          state
          zipCode
          floors {
            floorNumber
            rooms
          }
        }
      }
    }
  }
`;

export const CREATE_TRUCK = gql`
  mutation CreateTruck($input: TruckInput!) {
    createTruck(input: $input) {
      id
      number
      crewCab
      cdl
      cdlProgram
      goodTailgate
      roles
    }
  }
`;

export const UPDATE_TRUCK = gql`
  mutation UpdateTruck($id: ID!, $input: TruckInput!) {
    updateTruck(id: $id, input: $input) {
      id
      number
      crewCab
      cdl
      cdlProgram
      goodTailgate
      roles
    }
  }
`;

export const DELETE_TRUCK = gql`
  mutation DeleteTruck($id: ID!) {
    deleteTruck(id: $id) {
      id
      number
      crewCab
      cdl
      cdlProgram
      goodTailgate
      roles
    }
  }
`;

export const CREATE_VAN = gql`
  mutation CreateVan($input: VanInput!) {
    createVan(input: $input) {
      id
      openBack
      roles
    }
  }
`;

export const UPDATE_VAN = gql`
  mutation UpdateVan($id: ID!, $input: VanInput!) {
    updateVan(id: $id, input: $input) {
      id
      openBack
      roles
    }
  }
`;

export const DELETE_VAN = gql`
  mutation DeleteVan($id: ID!) {
    deleteVan(id: $id) {
      id
      openBack
      roles
    }
  }
`;
