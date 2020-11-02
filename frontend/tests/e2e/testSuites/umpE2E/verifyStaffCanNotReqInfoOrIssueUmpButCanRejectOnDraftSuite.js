const createTestCafe = require('testcafe');
const log = require('npmlog')
Object.defineProperty(log, 'heading', { get: () => { return new Date().toString() } })
log.headingStyle = { bg: '', fg: 'blue' }

let testcafe = null;

createTestCafe('localhost', 1337, 1338)
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();

        return runner
            // list multiple test files
            .src([
                
                "tests/e2e/testCases/Ump/studentSubmitFirstNameChange.js",

                "tests/e2e/testCases/mailsac/mailsacDeleteUmpEmailWithOutActivatingForDraftTest.js",

                "tests/e2e/testCases/admin/verifyStaffCanNotReqInfoOrIssueUmpButCanRejectOnDraft.js"

            ])
            .run();
    })
    .then(failedCount => {
        log.info('Tests failed: ' + failedCount);
        if(failedCount !== 0)
        {
            throw new Error("Test failed");
        }
        testcafe.close();
    });
