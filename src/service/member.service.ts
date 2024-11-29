import { Member } from '../interface/Member';
import { Library } from '../repository/library.entity';
import { lock } from '../utils/mutex.util';

export class MemberService {
    constructor(private library: Library) {}

    async addMember(member: Member): Promise<Member> {
        const release = await lock.acquire();
        try {
            if (this.library.members.has(member.id)) {
                throw new Error(`Member with ID ${member.id} already exists.`);
            }
            this.library.members.set(member.id, { ...member });
            return this.library.members.get(member.id) as Member;
        } finally {
            release();
        }
    }
}
