import { FakeService } from './db/mock/fake.service';
import { IndexedDbService } from './db/indexed-db.service';
import { LogService } from './log.service';
import { CheckpointLocationService } from './db/checkpoint-location.services';


export const ALL_SERVICES = [
    FakeService,
    IndexedDbService,
    LogService,
    CheckpointLocationService
    // { provide: CheckpointLocationService, useClass: CheckpointLocationService }
];