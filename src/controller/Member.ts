import { Router, Request, Response } from 'express';
import { MemberService } from '../service/member.service';
import { libraryInstance } from '../repository/library.entity';
import { Member } from '../interface/Member';

import { validateDTO } from '../utils/validator.util';
import { CreateMemberDTO } from '../dto/member.dto';

const router = Router();

router.post('/', async (req: Request, res: Response) => {

    const { id, name } = req.body;

    const memberService: MemberService = new MemberService(libraryInstance);

    const memberDetails: Member = { id, name };

    try {
        await validateDTO(CreateMemberDTO, memberDetails);
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Invalid member details | %o`, error);
        res.status(400).json({ status: false, error: error?.message });
        return;  // Prevent the rest of the function from executing if validation fails.
    }

    try {
        // Add member to the in-memory database
        await memberService.addMember(memberDetails);

        // Return the created user
        res.status(201).json({ status: true, message: 'Member inserted sucessfully.', data: memberDetails });
    } catch (error: any) {
        // Handle error and return appropriate response
        console.error(`C-B-E001 | Unable to insert member | %o`, error);
        res.status(500).json({ status: false, message: error.message });
    }
});

export default router;
