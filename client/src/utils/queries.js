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
      date
      trucks {
        id
        number
        crewCab
        cdlProgram
        cdl
        goodTailgate
        roles
      }
      vans {
        id
        number
        openBack
        roles
      }
      account {
        id
        names
      }
      serviceType
      contact {
        id
        firstName
        lastName
        title
        email
        phone
        company {
          id
          names
        }
        roles
      }
      origin
      destination
      crewSize
      supervisors {
        id
        firstName
        lastName
        roles
        email
        phone
      }
      startTime
      drivers {
        id
        firstName
        lastName
        roles
        cdlProgram
        cdl
        email
        phone
      }
      helpers {
        id
        firstName
        lastName
        roles
        cdlProgram
        cdl
        email
        phone
      }
      techs {
        id
        firstName
        lastName
        roles
        cdlProgram
        cdl
        email
        phone
      }
      description
      remarks
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
