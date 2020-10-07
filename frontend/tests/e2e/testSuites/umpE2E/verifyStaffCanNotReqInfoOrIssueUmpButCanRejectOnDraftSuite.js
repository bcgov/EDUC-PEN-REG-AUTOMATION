const createTestCafe = require('testcafe');
const log = require('npmlog')

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

                "tests/e2e/testCases/admin/verifyStaffCanNotReqInfoOrIssueUmpOnDraft.js",

                "tests/e2e/testCases/admin/staffRejectDraftUmpRequest.js"

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
