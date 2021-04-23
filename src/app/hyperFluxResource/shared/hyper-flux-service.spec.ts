import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HyperFluxService } from './hyper-flux-service';

describe('HyperFluxService', () => {
  let hyperFluxService: HyperFluxService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [HyperFluxService]
    });

    hyperFluxService = TestBed.inject(HyperFluxService);
    httpMock = TestBed.inject(HttpTestingController);
});

  it('should have a service instance', () => {
    expect(hyperFluxService).toBeDefined();
  });

  describe('getField', () => {
    it('Should return a field', (done) => {
      const id = 2;
      const field = {
        id:	2,
        name:	'field 1',
        encRate:	400,
        fluxStateWarning: false,
        connections:	450,
        vSpaceUsage:	3445,
        vSpaceLimit:	2334,
        gfaBandwidthUsage:	444.55,
        gfaBandwidthLimit:	33,
        createdAt: '2021-04-08T17:48:09.039Z',
        updatedAt: '2021-04-08T17:48:09.039Z'
      }

      hyperFluxService.getField(id).subscribe((result) => {
        expect(result.name).toBe('field 1');
        done();
      });
      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(field);
    });

  });

  describe('getFields', () => {
    it('should return a fields', (done) => {

      const field1 = {
        id:	1,
        name:	'field 1',
        encRate:	410,
        fluxStateWarning: false,
        connections:	450,
        vSpaceUsage:	3445,
        vSpaceLimit:	2334,
        gfaBandwidthUsage:	444.55,
        gfaBandwidthLimit:	33,
        createdAt: '2021-04-08T17:48:09.039Z',
        updatedAt: '2021-04-08T17:48:09.039Z'
      };

      const field2 = {
        id:	2,
        name:	'field 2',
        encRate:	400,
        fluxStateWarning: false,
        connections:	450,
        vSpaceUsage:	3445,
        vSpaceLimit:	6734,
        gfaBandwidthUsage:	444.55,
        gfaBandwidthLimit:	33,
        createdAt: '2021-04-08T17:48:09.039Z',
        updatedAt: '2021-04-08T17:48:09.039Z'
      };

      const fields = [
        field1,
        field2
      ];

      hyperFluxService.getFields().subscribe((result) => {
        expect(result.length).toBe(2);
        done();
      });
      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields`);
      expect(req.request.method).toEqual('GET');
      req.flush(fields);

    })

  });

  describe('getRealys', () => {
    it('should get relays', (done) => {
      const relay1 = {
      id: 1,
      state: 'FLAT',
      strength: 9,
      field: 1,
      createdAt: '2021-04-08T17:48:09.039Z',
      updatedAt: '2021-04-08T17:48:09.039Z',
      };

      const relay2 = {
        id: 2,
        state: 'INVERTED',
        strength: 10,
        field: 1,
        createdAt: '2021-04-09T17:48:09.039Z',
        updatedAt: '2021-04-09T17:48:09.039Z',
      }

      const relays = [ relay1, relay2];
      hyperFluxService.getRelays(1).subscribe((result) => {
        expect(result.length).toBe(2);
        done();
      });
      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields/1/relays`);
      expect(req.request.method).toEqual('GET');
      req.flush(relays);

    });
  });

  describe('getTeam', () => {
    it('should return a team', (done) => {
      const id = 2;
      const team = {
      id:	2,
      name:	'Team 1',
      createdAt: '2021-04-08T17:48:09.039Z',
      updatedAt: '2021-04-08T17:48:09.039Z'
    }

      hyperFluxService.getTeam(id).subscribe((result) => {
        expect(result.name).toBe('Team 1');
        done();
      });
      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/teams/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(team);
    });
  });

  describe('getUsers', () => {
    it('should return users', (done) => {
      const id = 2;
      const users = [{
        id:	1,
        displayName: 'user 1',
        email: 'user@u.co',
        password:	'akdjkasjd',
        securityToken: 'adjkajdkad',
        securityTokenExpiration: '2021-04-08T17:48:09.039Z',
        role:	'OWNER',
        team:	2,
        createdAt:	'2021-04-08T17:48:09.039Z',
        updatedAt:	'2021-04-08T17:48:09.039Z',
        }]

      hyperFluxService.getUsers(id).subscribe((result) => {
        expect(result.length).toBe(1);
        done();
      });
      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/teams/${id}/users`);
      expect(req.request.method).toEqual('GET');
      req.flush(users);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', (done) => {
      const id = 2;
      hyperFluxService.deleteUser(id).subscribe((result) => {
        done();
      });
      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/users/${id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(id);

    });
  });

  describe('deleteRelay', () => {
    it('should delete a relay', (done) => {
      const id = 2;
      hyperFluxService.deleteRelay(id).subscribe((result) => {
        done();
      });
      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/relays/${id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(id);

    });
  });

  describe('saveRelay', () => {
    it('should save a relay', (done) => {
      const id = 2;
      const relayData = {
        state: 'FLAT',
        strength: 4,
      };
      hyperFluxService.saveRelay(id, relayData).subscribe((result) => {
        expect(result.state).toBe('FLAT');
        done();
      })

      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/relays/${id}`);
      expect(req.request.method).toEqual('PUT');
      req.flush({
        id: 2,
        state: 'FLAT',
        strength: 4,
      });
    });
  });

  describe('saveField', () => {
    it('should save a relay', (done) => {
      const id = 2;
      const fieldData = {
        connections: 9,
        gfaBandwidthLimit: 4000,
        vSpaceLimit: 4550
      };
      hyperFluxService.saveField(id, fieldData).subscribe((result) => {
        expect(result.connections).toBe(9);
        expect(result.gfaBandwidthLimit).toBe(4000);
        expect(result.vSpaceLimit).toBe(4550)
        done();
      });

      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/flux/fields/${id}`);
      expect(req.request.method).toEqual('PUT');
      req.flush({
        id: 2,
        connections: 9,
        gfaBandwidthLimit: 4000,
        vSpaceLimit: 4550
      });
    });
  });

  describe('saveUser', () => {
    it('should save a relay', (done) => {
      const id = 2;
      const userData = {
        displayName: 'Test User',
        role: 'MEMBER'
      };
      hyperFluxService.saveUser(id, userData).subscribe((result) => {
        expect(result.displayName).toEqual('Test User');
        expect(result.role).toBe('MEMBER')
        done();
      });

      const req = httpMock.expectOne(`http://hyperflux.herokuapp.com/hyperflux/api/v1/iam/users/${id}`);
      expect(req.request.method).toEqual('PUT');
      req.flush({
        id: 2,
        displayName: 'Test User',
        role: 'MEMBER'
      });
    });

  });
});
