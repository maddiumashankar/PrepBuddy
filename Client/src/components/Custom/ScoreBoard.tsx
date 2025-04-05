import React from "react";
import { Award, Medal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const leaderboardData = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    totalPoints: 5840,
    testsAttended: 42,
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    totalPoints: 5720,
    testsAttended: 39,
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    totalPoints: 5650,
    testsAttended: 38,
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    totalPoints: 5430,
    testsAttended: 36,
  },
  {
    id: 5,
    name: "James Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    totalPoints: 5280,
    testsAttended: 35,
  },
  {
    id: 6,
    name: "Olivia Martin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    totalPoints: 5150,
    testsAttended: 34,
  },
  {
    id: 7,
    name: "Ethan Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan",
    totalPoints: 4980,
    testsAttended: 33,
  },
  {
    id: 8,
    name: "Sophia Taylor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
    totalPoints: 4820,
    testsAttended: 32,
  },
  {
    id: 9,
    name: "Daniel Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    totalPoints: 4750,
    testsAttended: 31,
  },
  {
    id: 10,
    name: "Ava Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    totalPoints: 4620,
    testsAttended: 30,
  },
];

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) {
    return (
      <div className="flex items-center">
        <Badge className="bg-yellow-500 hover:bg-yellow-600 mr-2">{rank}</Badge>
        <Award className="h-5 w-5 text-yellow-500" />
      </div>
    );
  } else if (rank === 2) {
    return (
      <div className="flex items-center">
        <Badge className="bg-gray-400 hover:bg-gray-500 mr-2">{rank}</Badge>
        <Award className="h-5 w-5 text-gray-400" />
      </div>
    );
  } else if (rank === 3) {
    return (
      <div className="flex items-center">
        <Badge className="bg-amber-700 hover:bg-amber-800 mr-2">{rank}</Badge>
        <Medal className="h-5 w-5 text-amber-700" />
      </div>
    );
  }

  return (
    <Badge variant="outline" className="bg-transparent">
      {rank}
    </Badge>
  );
};

interface HeaderProps {
  userID: string;
}

const ScoreBoard: React.FC<HeaderProps> = ({ userID }) => {
  console.log(userID);
  return (
    <Card className="w-full m-2">
      <CardHeader className="bg-black text-white rounded-lg">
        <CardTitle className="text-center text-2xl">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/5">
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Tests</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((user, index) => (
              <TableRow
                key={user.id}
                className={`transition-all duration-300 rounded-xl p-4 ${
                  index === 0
                    ? "bg-yellow-100 text-yellow-900 hover:bg-yellow-200"
                    : index === 1
                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    : index === 2
                    ? "bg-amber-200 text-amber-900 hover:bg-amber-300"
                    : "bg-black hover:bg-zinc-800"
                }`}
              >
                <TableCell>
                  <RankBadge rank={index + 1} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3 max-[353px]:flex-col">
                    <Avatar
                      className={`h-10 w-10 border-2 ${
                        index === 0
                          ? "border-yellow-500"
                          : index === 1
                          ? "border-gray-400"
                          : index === 2
                          ? "border-amber-700"
                          : "border-transparent"
                      }`}
                    >
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium max-[353px]:text-center">
                      {user.name}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {user.totalPoints.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {user.testsAttended}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;
