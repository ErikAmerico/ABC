import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
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

export const GET_ALL_USER_IDS = gql`
  {
    users {
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

export const GET_ALL_TRUCKS = gql`
  {
    getTrucks {
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

export const GET_ALL_VANS = gql`
  {
    getVans {
      id
      number
      openBack
      roles
    }
  }
`;

export const FETCH_JOBS_BY_DATE = gql`
  query getJobsByDate($date: String!) {
    getJobsByDate(date: $date) {
      id
      trucks {
        id
      }
      vans {
        id
      }
      account {
        id
      }
      serviceType
      contact {
        id
      }
      origin
      destination
      crewSize
      startTime
      drivers {
        id
      }
      helpers {
        id
      }
      techs {
        id
      }
      remarks
    }
  }
`;

export const GET_MOVE = gql`
  query GetMove($id: ID!) {
    getMove(id: $id) {
      id
      date
      startTime
      estimate
      origin {
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
        contact {
          id
          name
          title
          email
          phone
        }
        altContact {
          id
          name
          title
          email
          phone
        }
        additional
      }
      destination {
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
        contact {
          id
          name
          title
          email
          phone
        }
        altContact {
          id
          name
          title
          email
          phone
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
        roles
        email
        phone
      }
      drivers {
        id
        firstName
        lastName
        roles
        email
        phone
      }
      helpers {
        id
        firstName
        lastName
        roles
        email
        phone
      }
      techs {
        id
        firstName
        lastName
        roles
        email
        phone
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
      attention
      holdForCrates
      salesMan {
        id
        firstName
        lastName
        roles
        email
        phone
      }
      author {
        id
        firstName
        lastName
        roles
        email
        phone
      }
      poNum
      projectNum
      references
      groupBill
      prePayment
    }
  }
`;

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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

export const GET_ALL_COMPANIES = gql`
  {
    getCompanies {
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

export const GET_CONTACT = gql`
  query GetContact($id: ID!) {
    getContact(id: $id) {
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
      }
    }
  }
`;

export const GET_ALL_CONTACTS = gql`
  {
    getContacts {
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
      }
    }
  }
`;
