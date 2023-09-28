import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      roles
      email
      phone
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
      email
      phone
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
      email
      phone
    }
  }
`;

export const CREATE_MOVE = gql`
  mutation CreateMove($input: MoveInput!) {
    createMove(input: $input) {
      id
      date
      startTime
      estimate
      origin {
        company {
          id
          names
        }
        contact {
          id
          name
        }
        altContact {
          id
          name
        }
        additional
      }
      destination {
        company {
          id
          names
        }
        contact {
          id
          name
        }
        altContact {
          id
          name
        }
        additional
      }
      noCrewCab
      tailgate
      truck100
      openBack
      stairs
      tooltime
      crewSize
      trucks
      vans
      supervisors {
        id
        firstName
        lastName
      }
      drivers {
        id
        firstName
        lastName
      }
      helpers {
        id
        firstName
        lastName
      }
      techs {
        id
        firstName
        lastName
      }
      equipment {
        dollies
        comps
        panels
        library
        bins
        teachBins
        trashBins
        tools
        makita
        ramps
        platform
        steelPlate
        hoodLift
        safeJacks
        palletJacks
        sknnyJack
        Jbar
        bigRed
        masonite
        ductTape
        blutTape
        coroflex
        carpetGuard
        broom
        allenSet
        bitBox
        socketSet
        foam
        white
        carpetRiser
        rubberRiser
        other
      }
      description
      insurance
      billTo {
        id
        names
      }
      attention
      holdForCrates
      salesMan {
        id
        firstName
        lastName
      }
      author {
        id
        firstName
        lastName
      }
      poNum
      projectNum
      references
      groupBill
      prePayment
    }
  }
`;

export const UPDATE_MOVE = gql`
  mutation UpdateMove($id: ID!, $input: MoveInput!) {
    updateMove(id: $id, input: $input) {
      id
      date
      startTime
      estimate
      origin {
        company {
          id
          names
        }
        contact {
          id
          name
        }
        altContact {
          id
          name
        }
        additional
      }
      destination {
        company {
          id
          names
        }
        contact {
          id
          name
        }
        altContact {
          id
          name
        }
        additional
      }
      noCrewCab
      tailgate
      truck100
      openBack
      stairs
      tooltime
      crewSize
      trucks
      vans
      supervisors {
        id
        firstName
        lastName
      }
      drivers {
        id
        firstName
        lastName
      }
      helpers {
        id
        firstName
        lastName
      }
      techs {
        id
        firstName
        lastName
      }
      equipment {
        dollies
        comps
        panels
        library
        bins
        teachBins
        trashBins
        tools
        makita
        ramps
        platform
        steelPlate
        hoodLift
        safeJacks
        palletJacks
        sknnyJack
        Jbar
        bigRed
        masonite
        ductTape
        blutTape
        coroflex
        carpetGuard
        broom
        allenSet
        bitBox
        socketSet
        foam
        white
        carpetRiser
        rubberRiser
        other
      }
      description
      insurance
      billTo {
        id
        names
      }
      attention
      holdForCrates
      salesMan {
        id
        firstName
        lastName
      }
      author {
        id
        firstName
        lastName
      }
      poNum
      projectNum
      references
      groupBill
      prePayment
    }
  }
`;

export const DELETE_MOVE = gql`
  mutation DeleteMove($id: ID!) {
    deleteMove(id: $id) {
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
        name
        title
        email
        phone
      }
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
        name
        title
        email
        phone
      }
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
        name
        title
        email
        phone
      }
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) {
      id
      name
      title
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

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: ID!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) {
      id
      name
      title
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
      name
      title
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
