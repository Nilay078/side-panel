export const SideBarMenuList = [
    {
        text: 'Dashboard',
        icon: 'icon-speed-fast',
        routerLink: '/dashboard',
    },
    {
        text: 'Notification',
        icon: 'icon-alarm',
        routerLink: 'notification',
        children: [
            {
                text: 'Institutions',
                icon: 'icon-graduation-hat',
                routerLink: '',
            },
            {
                text: 'Accounts',
                icon: 'icon-calculator2',
                routerLink: '',
            },
        ]
    },
    {
        text: 'Admins',
        icon: 'icon-shield-check',
        routerLink: '',
    },
    {
        text: 'Payment Gateway',
        icon: 'icon-bag-dollar',
        routerLink: '',
    },
    {
        text: 'Plan Builder',
        icon: 'icon-clipboard-pencil',
        routerLink: '',
    },
    {
        text: 'System Emails',
        icon: 'icon-envelope',
        routerLink: '',
    },
];
