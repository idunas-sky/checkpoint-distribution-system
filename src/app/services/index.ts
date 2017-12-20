import { FakeService } from './db/mock/fake.service';
import { IndexedDbService } from './db/indexed-db.service';
import { LogService } from './log.service';
import { CheckpointLocationService } from './db/checkpoint-location.services';
import { SettingsService } from './db/settings.service';


export const ALL_SERVICES = [
    FakeService,
    IndexedDbService,
    LogService,
    CheckpointLocationService,
    SettingsService
    // { provide: CheckpointLocationService, useClass: CheckpointLocationService }
];