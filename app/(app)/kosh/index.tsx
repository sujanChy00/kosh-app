import { Link, Stack } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { PlusIcon } from '~/components/icons/plus-icon';

const KoshScreen = () => {
  return (
    <View className="flex-1">
      <Stack.Screen options={{ title: 'Kosh' }} />
      <Link asChild href="/kosh/add">
        <TouchableOpacity className="absolute bottom-6 right-4 z-20 size-14 items-center justify-center rounded-2xl bg-secondary shadow">
          <PlusIcon className="text-secondary-foreground" />
        </TouchableOpacity>
      </Link>
      <ScrollView contentContainerClassName="p-4">
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ut, qui ex explicabo saepe
          veritatis laborum laudantium delectus ratione blanditiis, repellendus atque corrupti sunt
          laboriosam nihil iste. Rem, aliquid dolorum atque velit minus reiciendis eum neque veniam
          voluptates incidunt impedit qui at, eius, asperiores repudiandae quae! Eum aut eius illum
          facilis ad praesentium saepe sunt, ex quaerat reprehenderit beatae non, numquam voluptates
          tenetur perspiciatis exercitationem odit minima nemo magni! Voluptates expedita inventore
          neque deleniti corrupti provident ad rerum nemo, recusandae quisquam velit nostrum tempora
          et? Sequi accusantium maiores nesciunt porro quasi ducimus optio iure at et aliquam?
          Harum, veniam saepe! Dicta nam inventore alias explicabo, maxime repellat adipisci animi
          non voluptatem deleniti minima. At iure et consequuntur ratione repellendus reprehenderit
          ad sunt eos architecto similique odit placeat saepe corrupti dicta unde quos vero, facere,
          porro iusto, sed dolorum. Hic porro atque aperiam molestias possimus cumque ipsam numquam
          laboriosam magni sit ullam alias quos maxime voluptatem enim ratione dolorum, ipsum
          adipisci tempora harum illum, recusandae non. Cupiditate iure tempore similique impedit!
          Nulla asperiores, deleniti eos modi voluptatibus atque numquam saepe fugit nihil
          consequuntur iste labore reiciendis quos? Labore provident minima explicabo pariatur
          nostrum veniam nesciunt impedit quo, qui placeat itaque minus numquam facere earum ipsam
          tenetur voluptates corporis natus. Repellat eligendi cumque perspiciatis quia autem,
          exercitationem incidunt vel, obcaecati modi similique labore, facilis doloribus rerum
          maiores consequuntur quod. Odit at incidunt quasi consectetur voluptas eum quod modi in
          suscipit recusandae vero necessitatibus rem voluptatibus harum expedita, inventore ipsum
          debitis labore, odio non. Vero, obcaecati? Architecto nesciunt atque officiis sed nulla
          nobis cupiditate eius, minus quam, in ipsa! Officiis repudiandae nam dolor similique rerum
          quibusdam veritatis fugit! Culpa perferendis labore veniam minima iusto, voluptas
          inventore, quidem suscipit praesentium possimus repudiandae alias ad officiis. Sapiente
          dolor nobis doloribus, at omnis quas doloremque tenetur voluptatibus natus vel porro
          veniam repudiandae praesentium alias placeat quam saepe sunt eveniet. Laboriosam, suscipit
          dolorem ad dolorum distinctio provident numquam sint incidunt illum, atque eligendi soluta
          iure sequi. Pariatur doloremque est blanditiis eveniet laboriosam ratione sint sapiente
          placeat, voluptates temporibus expedita suscipit sed totam odio? Vitae dicta autem
          distinctio veritatis saepe nulla minima odit blanditiis accusantium sit, eius quo
          doloremque incidunt iste hic obcaecati assumenda dolorem eaque suscipit nostrum
          consequatur dolorum beatae iure! Accusantium magni modi hic quia dignissimos, nulla ad
          pariatur architecto nihil quas, quisquam similique perferendis distinctio ex sunt
          repellendus? Consequatur voluptatum cupiditate voluptas quo totam recusandae soluta nihil
          velit alias! Repudiandae, aut ad necessitatibus incidunt alias eaque voluptatibus.
          Perspiciatis accusamus cumque nostrum eos veritatis alias mollitia culpa ipsam repellat,
          voluptatum id fugit quisquam nesciunt. Recusandae veritatis a nam molestiae asperiores
          sapiente, tempore sint totam voluptates sequi nobis dolores, ratione obcaecati corporis ut
          excepturi sit perferendis, et odit id iure mollitia? Molestias aliquid exercitationem quae
          voluptas cumque totam dolores ex iure accusamus est voluptate nihil nulla odit, architecto
          et distinctio, harum in nemo quas eos. Quos enim, error ipsa obcaecati, aspernatur at
          ratione ipsum doloremque, nihil quia eius rem perspiciatis dolores eos sapiente ipsam
          omnis accusantium qui!
        </Text>
      </ScrollView>
    </View>
  );
};

export default KoshScreen;
