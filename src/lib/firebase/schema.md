# Firestore Schema Design

## Collections

### `users`
Stores user profile and role information.
- `uid` (string): Firebase Auth UID (Document ID)
- `email` (string): User email
- `displayName` (string): Full name
- `role` (string): One of `admin`, `hr_ops`, `recruiter`, `hiring_manager`, `payroll`, `employee`, `candidate`, `finance`, `it_admin`
- `department` (string): e.g., "Engineering", "HR"
- `title` (string): Job title
- `createdAt` (timestamp)
- `lastLogin` (timestamp)

### `jobs`
- `id` (string): Auto-generated
- `title` (string)
- `department` (string)
- `hiringManagerId` (string): UID of the hiring manager
- `recruiterId` (string): UID of the recruiter
- `status` (string): `draft`, `published`, `closed`
- `candidates` (array of strings): IDs of candidates in pipeline

### `candidates`
- `id` (string): Auto-generated
- `name` (string)
- `email` (string)
- `phone` (string)
- `resumeUrl` (string)
- `appliedJobs` (array of strings): Job IDs
- `status` (string): `new`, `screening`, `interview`, `offer`, `hired`, `rejected`

### `employees`
- `id` (string): Employee ID (could be same as UID or internal ID)
- `userId` (string): Link to `users` collection
- `joiningDate` (timestamp)
- `salary` (number)
- `managerId` (string)

## Security Rules Overview
- **users**: Users can read their own profile. Admins can read/write all. HR Ops can read/write all except `admin` role changes.
- **jobs**: Public read for published jobs. Recruiters/Admins write.
- **candidates**: Recruiters can read/write candidates for their jobs.
