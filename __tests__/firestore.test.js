import { db } from '../src/firebase';

// Simple unit test to ensure Firestore is initialised. This test
// verifies that the exported db object exists. More comprehensive
// tests might mock Firestore reads and writes.
describe('Firebase', () => {
  it('initialises Firestore', () => {
    expect(db).toBeDefined();
  });
});