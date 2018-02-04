import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let companies = [
        {
            id: 0,
            name: "TCS",
            // contact: {
                contact: "Tejaswi",
                number: 9874569854,
                email: "tejaswi.1si14is056@gmail.com",
            // },
            website: "tcs.com",
            description: "tata consultency service",
            type: "IT service",
            status: "Active"
        },
        {
            id: 1,
            name: "IBM",
            // contact: {
                contact: "Tejaswi",
                number: 9874569854,
                email: "tejaswi.1si14is056@gmail.com",
            // },
            website: "IBM.com",
            description: "tata consultency service",
            type: "IT service",
            status: "Active"
        },
        {
            id: 2,
            name: "TVS",
            // contact: {
                contact: "Tejaswi",
                number: 9874569854,
                email: "tejaswi.1si14is056@gmail.com",
            // },
            website: "TVS.com",
            description: "tata consultency service",
            type: "IT service",
            status: "Inactive"
        },
        {
            id: 3,
            name: "Mahindra and Mahindra",
            // contact: {
                contact: "Tejaswi",
                number: 9874569854,
                email: "tejaswi.1si14is056@gmail.com",
            // },
            website: "tcs.com",
            description: "tata consultency service",
            type: "IT service",
            status: "Inactive"
        },
        {
            id: 4,
            name: "J P Morgan",
            // contact: {
                contact: "Tejaswi",
                number: 9874569854,
                email: "tejaswi.1si14is056@gmail.com",
            // },
            website: "tcs.com",
            description: "tata consultency service",
            type: "IT service",
            status: "Obsolete"
        },
        {
            id: 5,
            name: "TVS",
            // contact: {
                contact: "Tejaswi",
                number: 9874569854,
                email: "tejaswi.1si14is056@gmail.com",
            // },
            website: "tcs.com",
            description: "tata consultency service",
            type: "IT service",
            status: "Obsolete"
        }
    ];
    return {companies};
  }
}
