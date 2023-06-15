# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Add Custom IDs to the Agent Model
Title: Add `customId` field for Agent model
Description: The Agent's model needs to be updated and have a new field added: `customId`. This would be a string field and optional as not all Facilities may want or have custom IDs for their Agents.
Acceptance Criteria:

- New field `customId` is added to Agent model in the database schema
- Existing endpoints which create or update Agent details should now accept and handle this new `customId` field
- If no customId is provided when an Agent is created, it should be allowed to remain null.

Effort Estimate: 2 hours

---

Ticket 2: Expose Custom IDs in API Endpoints
Title: Show `customId` in related endpoints
Description: Agents' details obtained through API endpoints should contain the newly-added `customId`. This requires updates to any API that returns Agent data - view, create, and update API methods specifically.
Acceptance Criteria:

- All APIs returning Agent data now display `customId`
- New or updated Agents through the API accept and update `customId`

Effort Estimate: 2 hours

---

Ticket 3: Update the getShiftsByFacility Function
Title: Extend `getShiftsByFacility` to include Agent `customId`
Description: Update `getShiftsByFacility` function to include Agents' `customId` in the returned Shift data.
Acceptance Criteria:

- `getShiftsByFacility` now includes `customId` for each Agent tied to Shifts it returns
- If `customId` for an Agent is not found, it defaults to null

Effort Estimate: 2 hours

---

Ticket 4: Update Report Generation to Use Custom IDs
Title: Update `generateReport` to use Agent `customId`
Description: When generating PDF reports, if an Agent has a `customId`, that should be displayed. If not, the `AgentId` (internal id) should be displayed.
Acceptance Criteria:

- `generateReport` displays `customId` if it's non-null
- `generateReport` defaults to `AgentId` if `customId` is null

Effort Estimate: 3 hours
