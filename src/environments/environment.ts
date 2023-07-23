import { ServicePays } from '../app/services/pays-service';
import { ServicePays as ServicePaysMockService } from '../app/services/mock-pays';

export const environment = {
    production: false,
    providers: [
        { provide: ServicePays, useClass: ServicePaysMockService },
    ]
};