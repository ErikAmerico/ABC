import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      roles
      email
      phone
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
        name
        title
        email
        phone
      }
    }
  }
`;

export const GET_CONTACT = gql`
  query GetContact($id: ID!) {
    getContact(id: $id) {
      id
      name
      title
      email
      phone
      company {
        id
        names
      }
    }
  }
`;
