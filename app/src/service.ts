import { BaseService } from "@/modules/Base/services/BaseService";
import { UserService } from "@/modules/Profile/services/UserService";
import { FacultyService } from "@/modules/Faculty/services/FacultyService";
import { AwardsService } from "@/modules/Awards/services/AwardsService";
import { TasksService } from "@/modules/Tasks/services/TasksService";
import { ProfileService } from "@/modules/Profile/services/ProfileService";
import { ExamService } from "@/modules/Exam/services/ExamService";
import { DiplomService } from "@/modules/Diplom/services/DiplomService";

const Service = {
  base: new BaseService(),
  user: new UserService(),
  faculty: new FacultyService(),
  awards: new AwardsService(),
  tasks: new TasksService(),
  profile: new ProfileService(),
  exam: new ExamService(),
  diplom: new DiplomService(),
};

export default Service;
