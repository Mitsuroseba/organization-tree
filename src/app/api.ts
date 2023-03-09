const apiData = [
    {
        id: 1,
        name: 'John Doe',
        title: 'CEO',
        department: 'CEO',
        phone: '555-555-5555',
        email: 'jd@veo.com',
        children: [
            {
                id: 2,
                name: 'Mike Doe',
                title: 'Marketing HEAD',
                department: 'Marketing',
                phone: '555-555-5555',
                email: 'md@veo.com',
                children: [],
            }, {
                id: 3,
                name: 'Alexandra Doe',
                title: 'Engineering HEAD',
                department: 'Engineering',
                phone: '555-555-5555',
                email: 'ad@veo.com',
                children: [
                    {
                        id: 4,
                        name: 'Ole Peterson',
                        title: 'Product LEAD',
                        department: 'Engineering',
                        phone: '555-555-5555',
                        email: 'op@veo.com',
                        children: [
                            {
                                id: 4,
                                name: 'Ole Peterson',
                                title: 'Product LEAD',
                                department: 'Engineering',
                                phone: '555-555-5555',
                                email: 'op@veo.com',
                                children: [],
                            }
                        ],
                    }
                ],
            },
        ],
    },
];

// TODO: Add API calls here.
export function fetchOrganization() {
    return new Promise<{ data: Employee[] }>((resolve) =>
        setTimeout(() => resolve({ data: apiData }), 700)
    );
}