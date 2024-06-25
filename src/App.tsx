import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = z.object({
  firstname: z.string().min(1, { message: 'The field is required' }),
  lastname: z.string().min(1, { message: 'The field is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  'query-type': z.enum(['general-enquiry', 'support-request'], {
    required_error: 'Please select a query type'
  }),
  message: z.string().min(1, { message: 'The field is required' }),
  contacted: z.boolean().refine((value) => value, {
    message: 'To submit this form, please consent to being contacted'
  })
})

function App() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      message: '',
      contacted: false
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    toast(<div>A custom toast with default styling</div>, {
      duration: 5000,
      position: 'top-center'
    })
  }

  return (
    <main className='min-h-screen px-4 bg-[hsl(145,_38%,_91%)] font-karla grid items-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' bg-white w-full mx-auto max-w-[736px] px-6 py-[25px]'
        >
          <h2 className='font-bold text-3xl'>Contact Us</h2>
          <div className='mt-7 space-y-6'>
            <div className='space-y-6 sm:space-y-0 sm:flex sm:gap-4 '>
              <FormField
                control={form.control}
                name='firstname'
                render={({ field }) => (
                  <FormItem className='sm:flex-1'>
                    <FormLabel className='tracking-[1.4px]'>
                      First Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='h-[50px] border-gray-500 focus-visible:border-[hsl(169,_82%,_27%)] focus-visible:ring-offset-0 focus-visible:ring-[hsl(169,_82%,_27%)] focus-visible:ring-[1px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastname'
                render={({ field }) => (
                  <FormItem className='sm:flex-1'>
                    <FormLabel className='tracking-[1.4px]'>
                      Last Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='h-[50px] border-gray-500 focus-visible:border-[hsl(169,_82%,_27%)] focus-visible:ring-offset-0 focus-visible:ring-[hsl(169,_82%,_27%)] focus-visible:ring-[1px]'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='tracking-[1.4px]'>
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      className=' h-[50px] border-gray-500 focus-visible:border-[hsl(169,_82%,_27%)] focus-visible:ring-offset-0 focus-visible:ring-[hsl(169,_82%,_27%)] focus-visible:ring-[1px]'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='query-type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel className='tracking-[1.4px]'>
                    Query Type *
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem
                        className={cn(
                          'pl-2 flex items-center space-x-3 space-y-0 h-[50px] border-[1px] rounded-md border-gray-500',
                          {
                            'bg-[hsl(148,_38%,_91%)] border-[hsl(169,_82%,_27%)]':
                              field.value === 'general-enquiry'
                          }
                        )}
                      >
                        <FormControl>
                          <RadioGroupItem value='general-enquiry' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          General Enquiry
                        </FormLabel>
                      </FormItem>
                      <FormItem
                        className={cn(
                          'pl-2 flex items-center space-x-3 space-y-0 h-[50px] border-[1px] rounded-md border-gray-500',
                          {
                            'bg-[hsl(148,_38%,_91%)] border-[hsl(169,_82%,_27%)]':
                              field.value === 'support-request'
                          }
                        )}
                      >
                        <FormControl>
                          <RadioGroupItem value='support-request' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          Support Request
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='tracking-[1.4px]'>Message *</FormLabel>
                  <FormControl>
                    <Textarea
                      className='resize-none h-[240px]  border-gray-500 focus-visible:border-[hsl(169,_82%,_27%)] focus-visible:ring-offset-0 focus-visible:ring-[hsl(169,_82%,_27%)] focus-visible:ring-[1px]'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='contacted'
              render={({ field }) => (
                <FormItem>
                  <div className='flex flex-row items-start space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='accent-red-500'
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>
                        I consent to being contacted by the team
                      </FormLabel>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type='submit'
            className='mt-4 w-full h-14 rounded-md bg-[hsl(169,_82%,_27%)] hover:bg-[hsla(169,_82%,_27%,_0.8)]'
          >
            Submit
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default App
